import express, { Application } from "express";
import db_connect from "./config/db";
import cors from "cors";
import morgan from "morgan";
import Controller from "./utils/interface/controller.interface";
import ErrorHandling from "./middleware/error.handling";
import swaggerDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

class App {
    public app: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.port = port;

        this.db_connect();

        this.middleware();

        this.controllers(controllers);

        this.swaggerUI()

        this.errors()
    }

    private async db_connect() {
        await db_connect();
    }

    private middleware() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(morgan("dev"))
    }

    private errors() {
        this.app.use(ErrorHandling)
    }

    private swaggerUI() {
        const swaggerOptions = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'My API',
                    version: '1.0.0',
                    description: 'My API description',
                },
            },
            // Path to the API docs
            apis: ['./**/*.ts'],
        };

        const swaggerSpec = swaggerDoc(swaggerOptions);
        this.app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    }

    private controllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.app.use("/api", controller.router);
        })
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server run is ${this.port} port`);
        })
    }
}

export default App;
import express, { Application } from "express";
import db_connect from "./config/db";
import cors from "cors";
import morgan from "morgan";
import ErrorHandling from "./middleware/error.handling";
import swaggerDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { ProductRoute } from "./routes/product.route";
import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";
import orderRoute from "./routes/order.route";
import cartRoute from "./routes/cart.route";
import categoryRoute from "./routes/category.route";
import * as fs from "fs";
import cookieParser from "cookie-parser";
// import "./bot/command/index";

class App {
    public app: Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;

        this.db_connect();

        this.middleware();

        this.logging()

        this.controllers();

        this.swaggerUI()

        this.errors()

        return this;
    }

    private async db_connect() {
        await db_connect();
    }

    private middleware() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(cookieParser());
    }
    
    private logging() {
        this.app.use(morgan("dev"));
        const accessLogStream = fs.createWriteStream('./access.log',
            { flags: 'a' }
        );
    
        this.app.use(morgan("combined", { stream: accessLogStream }));    
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
            servers: [
                {
                    url: `http://localhost:${this.port}/`,
                    description: 'Development server'
                }
            ],
            // Path to the API docs
            apis: ['./**/*.ts'],
        };

        const swaggerSpec = swaggerDoc(swaggerOptions);
        this.app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    }

    private controllers(): void {
        this.app.use("/api/auth", authRoute)
        this.app.use("/api/user", userRoute)
        this.app.use("/api/product", ProductRoute)
        this.app.use("/api/order", orderRoute)
        this.app.use("/api/cart", cartRoute)
        this.app.use("/api/category", categoryRoute)
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server run is ${this.port} port`);
        })
    }
}

export default App;
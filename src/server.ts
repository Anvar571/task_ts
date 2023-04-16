import "dotenv/config";
import App from "./app";
import ProductCtrl from "./controller/product.ctrl";

const app = new App([
    new ProductCtrl()
], Number(process.env.PORT))

app.listen();
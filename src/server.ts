import "dotenv/config";
import App from "./app";
import "./bot/core/bot";

const app = new App(Number(process.env.PORT))

app.listen();
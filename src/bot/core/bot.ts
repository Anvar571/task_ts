import {Telegraf} from "telegraf";

const token: string = process.env.BOT_TOKEN || "";

const bot: Telegraf = new Telegraf(token);

bot.launch().then()

export default bot
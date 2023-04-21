import bot from "../core/bot";

bot.help(ctx => {
    const message = `/help Bu bot buyurtmalarni qabul qiladi \n /start botni ishga tushirish`;

    ctx.replyWithHTML(message);
})
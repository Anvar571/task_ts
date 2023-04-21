import bot from "../core/bot";

bot.start(ctx => {
    const name = ctx.from.first_name;
    const message = `Assalomu alaykum ${name} bu botga xush kelibsiz \nbu bot berilgan buyurtmalarni qabul qilish uchun sizga yordam beradi`;

    ctx.replyWithHTML(message);
})
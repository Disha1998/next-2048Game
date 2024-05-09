const { Telegraf } = require("telegraf");
require('dotenv')
// const TOKEN = process.env.NEXT_PUBLIC_BOT_TOKEN;
// console.log(TOKEN,'--------------');
const TOKEN = "7152050876:AAHvesqlLSBTgwMamx1EcVyIKFjpLt9MkZM"
const bot = new Telegraf(TOKEN);

const web_link = "https://next-2048-game.vercel.app/";

bot.start((ctx) =>
    ctx.reply("Welcome..!!!!!!!!", {
        reply_markup: {
            keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
        },
    })
);

bot.launch();


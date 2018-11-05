const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

bot.on('ready', async()=>{
    var x = {
        "test": "1"
    };
    fs.writeFileSync('./file.json', JSON.stringify(x));
    //console.log("\x1b[42m%s\x1b[0m", `Connected to ${bot.user.tag}!`);

});

bot.login(process.env.BOT_TOKEN);

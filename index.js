const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = ';;';
var CommandClass = require("./commands/commands.js");
var MainFunctions = require("./MainFunctions.js");

bot.on('ready', async()=>{
    console.log("\x1b[42m%s\x1b[0m", `Connected to ${bot.user.tag}!`);

    var game = prefix+'help';
    bot.user.setActivity(game);//'mikmak survival evolved');   

    MainFunctions.Update();
    //Show connected guilds:
    //bot.guilds.forEach(function(element){
    //    console.log(element.name);
    //});
});

bot.on('message', (message)=>{

    if(message.author.bot) return;
    if(message.mentions.users.first()==bot.user){
        message.reply("o/");
        return;
    }
    if(message.content!=null&&message.content.startsWith(prefix)){
        let cmd = message.content.split(' ');
        CommandClass.Run(message, cmd[0], prefix, bot);
        return;
    }
});

bot.setInterval(MainFunctions.Update, 10000);
bot.login(TOKEN);
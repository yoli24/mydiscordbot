const Discord = require('discord.js');
const bot = new Discord.Client();
var timeCounter = require('./timecounter.js');


bot.on('ready', async()=>{
    console.log("\x1b[32m", 'Connected to '+bot.user.username+'!');
    timeCounter.NewDate(bot);
    bot.setInterval(function(){timeCounter.TimerTick(bot)}, 10000);
	 bot.setInterval(function(){
        timeCounter.Notifications(bot);
    }, 10000)
   /* bot.setInterval(function(){
        timeCounter.Notifications(bot);
    }, 3600000)
	*/
});


const prefix = '!';
var cmd;
var helpMessage = "Bot commands: !today, !total"
bot.on('message', (message)=>{
    if(message.channel.type == "dm" && !message.author.bot && message.author.id != bot.user.id){
        cmd = message.content.split(' ')[0];

        switch(cmd){
            case prefix+"total":
                message.reply("This command is currently not avilable.");
            break;
            
            case prefix+"today":
                timeCounter.TodayToString(bot, message.author);
            break;

            default:
                message.reply(helpMessage);
            break;
        }
    }
});
bot.login(process.env.BOT_TOKEN);

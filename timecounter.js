const Discord = require('discord.js');
var channelIDS = {
    "Guilds":[{"GuildID": '326996219782234115', "Channels":["NV Squad"]}, 
    {"GuildID": '486265615988817920',"Channels":[""]}]
};
var todayTimeIDS = [];
var todayTimeCounter = [];
var todayTimeOnline = [];
const tickTime = 10000; //10 seconds
var o = [];
var currentDate;
var notifications =['242360233593274369', '331103748376100897'];

class TimeCounter{
    static Notifications(bot){
        var user;
        for(var i =0;i<notifications.length;i++){
            user = bot.users.find(user=> user.id == notifications[i]);
            this.TodayToString(bot, user);
        }
    }
    static NewDate(bot){
        currentDate = new Date();
        this.Notifications(bot);
    }
    static CheckDate(bot){
        var dateNow = new Date();
        if(dateNow.getDay()!=currentDate.getDay()){
            this.NewDate();
            todayTimeIDS=[];
            todayTimeCounter=[];
        }
    }
    static TimerTick(bot){
        var guild;
        todayTimeOnline = [];
         if(!todayTimeIDS.includes('265205555075743754')){
           todayTimeIDS.push('265205555075743754');
           todayTimeCounter.push(tickTime);

           todayTimeOnline.push('265205555075743754');
        }
         else{
            var index = todayTimeIDS.indexOf('265205555075743754');
            todayTimeCounter[index] += tickTime;

            todayTimeOnline.push('265205555075743754');
        }
                        
        for(var i = 0; i<channelIDS.Guilds.length;i++){
            guild = bot.guilds.find(guild => guild.id == channelIDS.Guilds[i].GuildID);
            var members = guild.members.filter(member => member.voiceChannel!=null);
            members.forEach(function(member){
                var voiceChannel = member.voiceChannel;
                var channelId;
                for(var j = 0; j<channelIDS.Guilds[i].Channels.length;j++){
                    channelId = channelIDS.Guilds[i].Channels[j];
                    if(voiceChannel.name.includes(channelId) || voiceChannel.id == channelId){
                        todayTimeOnline.push(member.id);

                        if(!todayTimeIDS.includes(member.id)){
                            todayTimeIDS.push(member.id);
                            todayTimeCounter.push(tickTime);
                        }
                        else{
                            var index = todayTimeIDS.indexOf(member.id);
                            todayTimeCounter[index] += tickTime;
                        }
                    }
                }
            });
        }
    }

    static BubbleSortTodayTime(){
        if(todayTimeIDS.length<2)
            return;
        o = [];
       for(var i =0; i<todayTimeIDS.length;i++){
           o.push({
               "ID": todayTimeIDS[i],
                "Time": todayTimeCounter[i],
                "Online": todayTimeOnline.includes(todayTimeIDS[i])
            });
       }
       this.BubbleSort();
       for(var i =0;i<o.length;i++){
           todayTimeIDS[i] = o[i].ID;
           todayTimeCounter[i] = o[i].Time;
       }
    }
    static BubbleSort(){
        var sorted = false;
        
        while(!sorted){
            sorted = true;
            for(var i=0;i<o.length-1;i++){
                if(o[i].Time < o[i+1].Time && (o[i].Online == o[i+1].Online)||
                 (o[i+1].Online && !o[i].Online)){
                    var temp = o[i];
                    o[i] = o[i+1];
                    o[i+1] = temp;
                    sorted = false;
                }
            }
        }
        return o;
    }
    static TodayToString(bot, user){
        var channel = user;
        if(todayTimeIDS.length==0){
            channel.send("No activity today.");
            return;
        }
        this.BubbleSortTodayTime();
        var text ="";//"Summary for today:"+"\n";
        var name;

        for(var i =0; i<todayTimeIDS.length;i++){
            name = bot.users.find(user => user.id == todayTimeIDS[i]);
            if(todayTimeOnline.includes(todayTimeIDS[i])){
                text+="[Online] ";
            }
            text+=name+": "+todayTimeCounter[i]+" seconds \n";
        }
        var emb = new Discord.RichEmbed();
        emb.addField("Summary for today: "+currentDate.toDateString(), text);
        text = "";
        for(var i =0;i<channelIDS.Guilds.length;i++){
            name = bot.guilds.find(guild => guild.id==channelIDS.Guilds[i].GuildID);
            text+=name;
            if(i != channelIDS.Guilds.length -1){
                text+=", ";
            }
        }
        emb.setFooter("Guilds: "+text);
        if(emb != null)
           channel.send(emb);
        else
           channel.send("No activity today.");

    }
}

module.exports = TimeCounter;
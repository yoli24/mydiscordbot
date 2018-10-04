"use strict";
const Discord = require('discord.js');

async function my_background_task(){
    console.log('t');
    return;
    await Discord.Client.wait_until_ready();
    var counter = 0;
    //var channel = discord.Object(id='channel_id_here')
    while (Discord.Client.status==0){
        counter += 1;
        console.log('t');
        //await client.send_message(channel, counter);
        await asyncio.sleep(60); // task runs every 60 seconds
    }
}
module.exports = my_background_task;
//client.run('token')
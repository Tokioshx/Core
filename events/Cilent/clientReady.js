const client = require('../../index');
const { Events, ActivityType, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

client.on(Events.ClientReady, async () => {
  client.user.setActivity(`${client.config.prefix}help | Let's play!`, { type: ActivityType.Playing });
  console.log(`${client.user.tag} is up and ready to go!`);

  let ch = await db.get('restart');
  if(ch == 1) {
    let chData = await db.get('restartChannel');
    let chMessage = await db.get('restartMessage');

    client.channels.cache.get(chData).messages.fetch(chMessage).then((msg) => {
      msg.edit({
        embeds: [
          new EmbedBuilder()
          .setAuthor({ name: 'Bot Restart Complete!', iconURL: client.user.displayAvatarURL({  forceStatic: true, extension: 'png' }) })
          .setColor('Green')
          .setDescription("Sucessfully restart my system! Now I'm ready to start the journey again!")
          .setFooter({ text: `Restart date` })
          .setTimestamp()
        ]
      });
    });

    await db.delete('restart');
    await db.delete('restartChannel');
    await db.delete('restartMessage');
  };
});
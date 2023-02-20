const { EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  name: 'restart',
  run: async (client, message) => {
    if(!client.config.developer.includes(message.author.id)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("You don't have the privilege to use this command!")
        ]
      });
    };

    let msg = await message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setAuthor({ name: 'Bot Restarting!', iconURL: client.user.displayAvatarURL({  forceStatic: true, extension: 'png' }) })
        .setColor('Red')
        .setDescription('Bot is on progress of restarting! Please wait 1 minute or less.')
        .setFooter({ text: `Restarted by ${message.author.tag}` })
        .setTimestamp()
      ]
    });

    await db.set('restart', 1);
    await db.set('restartChannel', message.channel.id);
    await db.set(`restartMessage`, msg.id);
    process.exit();
  },
};
const client = require('../index');
const { Events, EmbedBuilder } = require('discord.js');

client.on(Events.MessageDelete, async (message) => {
  if(message.author.bot || message.guild.id !== client.config.serverId || !message.guild) return;

  let embed = new EmbedBuilder()
  .setAuthor({ name: 'New Message Deleted', iconURL: message.author.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
  .setColor('#FF0000')
  .setDescription(message.content)
  .setFooter({ text: `${message.author.tag}` })
  .setTimestamp();

  let img = message.attachments.first() ? message.attachments.first().proxyURL : null;

  if(img) {
    embed.setImage(img)
  };

  client.channels.cache.get('1077220879471231026').send({ embeds: [embed] });
});
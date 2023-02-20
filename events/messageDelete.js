const client = require('../index');
const { Events, EmbedBuilder } = require('discord.js');

client.on(Events.MessageDelete, async (message) => {
  if(message.author.bot || message.guild.id !== client.config.serverId || !message.guild) return;

  let embed = new EmbedBuilder()
  .setAuthor({ name: 'New Message Deleted', iconURL: message.author.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
  .setColor('Random')
  .setDescription(message.content)
  .setFooter({ text: 'Waktu Dihapus' })
  .setTimestamp();

  let img = message.attachments.first() ? message.attachments.first().proxyURL : null;

  if(img) {
    embed.setImage(img)
  };

  client.channels.cache.get('1074194891694940170').send({ embeds: [embed] });
});
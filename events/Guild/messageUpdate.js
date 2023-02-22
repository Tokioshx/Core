const client = require('../../index');
const { Events, EmbedBuilder } = require('discord.js');

client.on(Events.MessageUpdate, async (oldMessage, newMessage) => {
  if(oldMessage.author.bot || oldMessage.guild.id !== process.env.serverId || !oldMessage.guild || oldMessage.content === newMessage.content) return;

  let embed = new EmbedBuilder()
  .setAuthor({ name: `New Message Edited`, iconURL: oldMessage.author.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
  .setColor('#FFA500')
  .setDescription(`Old Message\`\`\`\n${oldMessage}\`\`\`\nNew Message\`\`\`\n${newMessage}\`\`\``)
  .setFooter({ text: `${oldMessage.author.tag}` })
  .setTimestamp();

  client.channels.cache.get('1077220879471231026').send({ embeds: [embed] });
});
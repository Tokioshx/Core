const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  name: 'unwarn',
  run: async (client, message, args) => {
    if(!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('You need `kick member` permission to use this command!')
        ]
      }).then((msg) => {
        setTimeout(function() {
          msg.delete();
        }, 5000);
      });
    };

    let member = message.mentions.members.first();
    if(!member) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Please mention someone to unwarn them!')
        ]
      });
    } else if(member.id === message.author.id) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('You cannot unwarn yourself!')
        ]
      });
    };

    let totalUnwarn = args[1] || 1;
    if(isNaN(totalUnwarn)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Please provide a number not a character or symbols.')
        ]
      });
    };

    let data = await db.get(`warn_${member.id}, ${message.guild.id}`);
    if(data == null || data == 0) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("Looks like that member doesn't have any warning.")
        ]
      });
    } else if(totalUnwarn > data) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("Looks like that member doesn't have a warning that much.")
        ]
      });
    };

    await db.sub(`warn_${member.id}, ${message.guild.id}`, totalUnwarn);
    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Green')
        .setDescription(`${message.author} just unwarn ${member}`)
      ]
    });
  },
};
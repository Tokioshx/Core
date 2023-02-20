const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ban',
  run: async (client, message) => {
    if(!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('You need `ban member` permission to use this command!')
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
          .setDescription('Please mention someone to ban from the server!')
        ]
      });
    } else if(member.id === message.author.id) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('You cannot ban yourself!')
        ]
      });
    } else if(!member.bannable) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("Looks like I can't ban them.")
        ]
      });
    };

    let reason = message.content.split(' ').slice(2).join(' ') || 'No reason given';

    await member.ban({ reason: `Banned by ${message.author.tag} reason: ${reason}` }).then(() => {
      message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Green')
          .setDescription(`${message.author} just ban \`${member.user.tag}\` with reason: ${reason}`)
        ]
      });
    });
  },
};
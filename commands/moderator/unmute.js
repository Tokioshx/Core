const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'unmute',
  run: async (client, message) => {
    if(!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('You need `manage roles` permission to use this command!')
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
          .setDescription('Please mention someone to unmute from chat!')
        ]
      });
    } else if(member.id === message.author.id) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('You gonna unmute yourself? But-how?')
        ]
      });
    };

    if(!member.roles.cache.has('1075057054441553921')) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Looks like that member is not muted yet.')
        ]
      });
    };

    await member.roles.remove('1075057054441553921').then(() => {
      message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Green')
          .setDescription(`${message.author} just unmute ${member}`)
        ]
      });
    });
  },
};
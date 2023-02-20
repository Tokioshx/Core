const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'mute',
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
          .setDescription('Please mention someone to mute from chat!')
        ]
      });
    } else if(member.id === message.author.id) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('You cannot mute yourself!')
        ]
      });
    };

    if(member.roles.cache.has('1075057054441553921')) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Looks like that member already muted.')
        ]
      });
    };

    let reason = message.content.split(' ').slice(2).join(' ') || 'No reason given';

    await member.roles.add('1075057054441553921').then(() => {
      message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Green')
          .setDescription(`${message.author} just mute ${member} with reason: ${reason}`)
        ]
      });
    });
  },
};
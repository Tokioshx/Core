const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  name: 'checkwarn',
  aliases: ['cw'],
  run: async (client, message) => {
    if(!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('You need `manage messages` permission to use this command!')
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
          .setDescription('Please mention someone to check their warns!')
        ]
      });
    };

    let data = await db.get(`warn_${member.id}, ${message.guild.id}`);
    if(!data || data == null) data = 0;

    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setDescription(`${member} now have ${data} warnings left.`)
      ]
    });
  },
};
const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'clear',
  run: async (client, message, args) => {
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

    let clear = args[0];
    if(!clear) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Please provide how much message would you clear in this channel.')
        ]
      });
    } else if(isNaN(clear)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Please provide a number not a character or symbols.')
        ]
      });
    } else if(clear < 1 || clear > 99) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('The minimum value is 1 and maximum is 99.')
        ]
      });
    };

    let end = Number(clear) + 1;
    let endMessage = `${message.author} just deleted ${clear} ${(clear <= 1) ? 'message' : 'messages'} in this channel`;

    await message.channel.bulkDelete(end).then(() => {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Green')
          .setDescription(`${endMessage}`)
        ]
      }).then((msg) => {
        setTimeout(function() {
          msg.delete();
        }, 4000);''
      });
    });
  },
};
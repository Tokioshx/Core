const { EmbedBuilder } = require('discord.js');
let dev = process.env.developer ? process.env.developer.split(',') : [];

module.exports = {
  name: 'evaluation',
  aliases: ['eval'],
  run: async (client, message) => {
    if(!dev.includes(message.author.id)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("You don't have the privilege to use this command!")
        ]
      });
    };

    let args2 = message.content.split(' ').slice(1);
    let clean = text => {
      if(typeof(text) === 'string') return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)); else return text;
    };
 
    try {
      let code = args2.join(' ');
      if(!code) {
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
            .setColor('Red')
            .setDescription('Insert some javascript code to evaluation.')
          ]
        });
      };
      let evaled = eval(code);
      let end = message.content.slice(''.length).trim().split(/ +/);
      end.shift().toLowerCase().split(' ')[0]
      let output = clean(evaled);

      message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Navy')
          .setFields(
            { name: 'Input', value: `\`\`\`js\n${end.join(' ')}\`\`\`` },
            { name: 'Output', value: `\`\`\`js\n${output}\`\`\`` }
          )
        ]
      });
    } catch (err) {
      message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription(`There's an error while compile the code.\`\`\`xl\n${clean(err)}\n\`\`\``)
        ]
      });
    };
  },
};
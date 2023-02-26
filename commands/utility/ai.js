const { EmbedBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({apiKey: process.env.aiToken});
const openai = new OpenAIApi(configuration);

module.exports = {
  name: 'ai',
  aliases: ['chatgpt'],
  run: async (client, message, args) => {
    let question = args.join(' ');
    if(!question) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Give me some question and I will answer it!')
        ]
      });
    };

    try {
      message.channel.sendTyping();

      let respond = await openai.createCompletion({
        model: 'text-davinci-003',
        max_tokens: 2048,
        temperature: 0.5,
        prompt: question
      });

      let embed = new EmbedBuilder()
      .setColor('Navy')
      .setDescription(`${respond.data.choices[0].text}`);

      message.channel.send({ embeds: [embed] });
    } catch (e) {
      console.log(e);
      message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription(`Reqest failed with status code\`\`\`\n${e.response.status}\`\`\``)
        ]
      });
    };
  },
};
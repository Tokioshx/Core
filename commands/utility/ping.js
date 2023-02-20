const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setDescription(`Let's see my ping is... \`\`\`${client.ws.ping}ms\`\`\``)
      ]
    });
  },
};
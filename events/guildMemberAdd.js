const client = require('../index');
const { Events, EmbedBuilder } = require('discord.js');

client.on(Events.GuildMemberAdd, async (member) => {
  if(member.guild.id == client.config.guildId) {
    if(!member.user.bot) {
      client.channels.cache.get('1066220938724642827').send({
        embeds: [
          new EmbedBuilder()
          .setAuthor({ name: `${member.user.tag} Just join the server!`, iconURL: member.user.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
          .setColor('#0b4f6c')
          .setThumbnail(member.user.displayAvatarURL({ forceStatic: true, extension: 'png' }))
          .setDescription('We are glad to have you as a new member of our server. We hope you will enjoy your stay and feel free to explore and engage with our community.')
          .setImage('https://i.pinimg.com/564x/33/6d/d3/336dd33d5cfc180baf99d702bdd0592f.jpg')
          .setFooter({ text: 'Join Date' })
          .setTimestamp()
        ]
      });
    };
  };
});
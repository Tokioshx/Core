const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
  name: 'delch',
  run: async (client, message) => {
    if(!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('You need `manage channels` permission to use this command!')
        ]
      }).then((msg) => {
        setTimeout(function() {
          msg.delete();
        }, 5000);
      });
    };

    let channel = message.mentions.channels.first() || message.channel;
    
    let msg = await message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setAuthor({ name: 'Konfirmasi Delete Channel' })
        .setColor('Navy')
        .setDescription('Silahkan klik button dibawah jika anda yakin untuk menghapus channel ini.')
        .setFooter({ text: `Requested by ${message.author.tag}` })
        .setTimestamp()
      ],
      components: [
        new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setCustomId('yakin')
          .setLabel('Yakin')
          .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
          .setCustomId('tidak')
          .setLabel('Tidak')
          .setStyle(ButtonStyle.Danger)
        )
      ]
    });

    let collector = await msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 180000 });
    collector.on('collect', async (interaction) => {
      if(interaction.customId === 'yakin') {
        if(interaction.user.id !== message.author.id) {
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
              .setColor('Red')
              .setDescription('This is not your own button!')
            ],
            ephemeral: true
          });
        };

        if(channel.id !== message.channel.id) {
          await channel.delete(`Deleted by ${message.author.tag}`);
          msg.edit({
            embeds: [
              new EmbedBuilder()
              .setColor('Green')
              .setDescription('Berhasil menghapus channel `' + channel.name + '`!')
            ],
            components: []
          });
        } else {
          await channel.delete(`Deleted by ${message.author.tag}`);
        };
      };

      if(interaction.customId === 'tidak') {
        if(interaction.user.id !== message.author.id) {
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
              .setColor('Red')
              .setDescription('This is not your own button!')
            ],
            ephemeral: true
          });
        };

        await msg.edit({
          embeds: [
            new EmbedBuilder()
            .setColor('Green')
            .setDescription('Berhasil membatalkan menghapusan channel ini!')
          ],
          components: []
        });
      };
    });

    collector.on('end', async (collected) => {
      if(collected.size === 0) {
        msg.edit({
          embeds: [
            new EmbedBuilder()
            .setColor('Red')
            .setDescription("You doesn't click any button for 3 minutes, the task has been canceled.")
          ],
          components: []
        });
      };
    });
  },
};
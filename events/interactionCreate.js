const client = require('../index');
const { Events, EmbedBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, PermissionsBitField } = require('discord.js');

client.on(Events.InteractionCreate, async (interaction) => {
  if(interaction.isButton()) {
    if(interaction.customId === 'button') {
      let modal = new ModalBuilder()
      .setCustomId('modal')
      .setTitle('Fill the field to build a embed!');

      let title = new TextInputBuilder()
      .setCustomId('title')
      .setLabel('Title Embed')
      .setRequired(true)
      .setMaxLength(256)
      .setStyle(TextInputStyle.Short);

      let description = new TextInputBuilder()
      .setCustomId('description')
      .setLabel('Description Embed')
      .setRequired(true)
      .setMaxLength(4000)
      .setStyle(TextInputStyle.Paragraph);

      let footer = new TextInputBuilder()
      .setCustomId('footer')
      .setLabel('Footer Embed')
      .setRequired(true)
      .setMaxLength(2048)
      .setStyle(TextInputStyle.Short);

      let image = new TextInputBuilder()
      .setCustomId('image')
      .setLabel('Image Link')
      .setRequired(false)
      .setStyle(TextInputStyle.Short);

      let channel = new TextInputBuilder()
      .setCustomId('channel')
      .setLabel('Channel ID')
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

      let first = new ActionRowBuilder().addComponents(title);
      let second = new ActionRowBuilder().addComponents(description);
      let third = new ActionRowBuilder().addComponents(footer);
      let fourth = new ActionRowBuilder().addComponents(channel);
      let fifth = new ActionRowBuilder().addComponents(image);

      modal.addComponents(first, second, third, fourth, fifth);

      interaction.showModal(modal);
    };
  };

  if(interaction.isModalSubmit()) {
    if(interaction.customId === 'modal') {
      if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageWebhooks)) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor('Red')
            .setDescription("You don't have permission to build a embed!")
          ],
          ephemeral: true
        });
      };

      await interaction.deferReply({ ephemeral: true });

      let title = interaction.fields.getTextInputValue('title');
      let description = interaction.fields.getTextInputValue('description');
      let footer = interaction.fields.getTextInputValue('footer');
      let img = interaction.fields.getTextInputValue('image');
      let channel = interaction.fields.getTextInputValue('channel');

      let checkCh = interaction.guild.channels.cache.get(channel);
      if(!checkCh) {
        return interaction.editReply({
          embeds: [
            new EmbedBuilder()
            .setColor('Red')
            .setDescription('Please input a valid channel id!')
          ],
          ephemeral: true
        });
      };

      let embed = new EmbedBuilder()
      .setTitle(title)
      .setColor('Navy')
      .setDescription(description)
      .setFooter({ text: footer, iconURL: interaction.user.displayAvatarURL({ extension: 'png', forceStatic: true }) })
      .setTimestamp();

      if(img) {
        embed.setImage(img);
      };

      interaction.guild.channels.cache.get(channel).send({ embeds: [embed] }).catch(() => {
        return interaction.editReply({
          embeds: [
            new EmbedBuilder()
            .setColor('Red')
            .setDescription("Something was wrong, please try again with valid information.")
          ],
          ephemeral: true
        });
      });

      interaction.editReply({
        embeds: [
          new EmbedBuilder()
          .setColor('Green')
          .setDescription('Successfully created your embed!')
        ],
        ephemeral: true
      });
    };
  };
});
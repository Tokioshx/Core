const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
  name: 'help',
  aliases: ['h'],
  run: async (client, message) => {
    let msg = await message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setAuthor({ name: `${client.user.username} Command List`, iconURL: client.user.displayAvatarURL({ forceStatic: true, exntesion: 'png' }) })
        .setColor('Navy')
        .setDescription(`Click the button to see the commands!\nSee the category below!\nTotal commands is \`${client.commands.size}\`\nThe prefix is \`${process.env.prefix}\`\n\n**Command Categories**\n⛔・\`Moderation\`\n⚙️・\`Utility\`\n\n_If you found any of bug or glitch at this bot, please report it to **Tokioshy#4631** and will be fixed as soon as possible._`)
        .setImage('https://media.discordapp.net/attachments/1074194891694940170/1076285509321629787/Banner.gif')
        .setFooter({ text: `Requested by ${message.author.tag}` })
        .setTimestamp()
      ],
      components: [
        new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setCustomId('leftUtility')
          .setEmoji('⬅️')
          .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
          .setCustomId('home')
          .setEmoji('🏠')
          .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
          .setCustomId('delete')
          .setEmoji('🗑️')
          .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
          .setEmoji('➡️')
          .setCustomId('rightModerator')
          .setStyle(ButtonStyle.Success)
        )
      ]
    });

    let collector = await msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 180000 });
    collector.on('collect', async (interaction) => {
      if(interaction.isButton()) {
        if(interaction.user.id !== message.author.id) {
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
              .setColor('Red')
              .setDescription('This is not your own menu!')
            ],
            ephemeral: true
          });
        };

        interaction.deferUpdate();
        if(interaction.customId === 'home') {
          msg.edit({
            embeds: [
              new EmbedBuilder()
              .setAuthor({ name: `${client.user.username} Command List`, iconURL: client.user.displayAvatarURL({ forceStatic: true, exntesion: 'png' }) })
              .setColor('Navy')
              .setDescription(`Click the button to see the commands!\nSee the category below!\nTotal commands is \`${client.commands.size}\`\nThe prefix is \`${process.env.prefix}\`\n\n**Command Categories**\n⛔・\`Moderation\`\n⚙️・\`Utility\`\n\n_If you found any of bug or glitch at this bot, please report it to **Tokioshy#4631** and will be fixed as soon as possible._`)
              .setImage('https://media.discordapp.net/attachments/1074194891694940170/1076285509321629787/Banner.gif')
              .setFooter({ text: `Requested by ${message.author.tag}` })
              .setTimestamp()
            ],
            components: [
              new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                .setCustomId('leftUtility')
                .setEmoji('⬅️')
                .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                .setCustomId('home')
                .setEmoji('🏠')
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setCustomId('delete')
                .setEmoji('🗑️')
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setEmoji('➡️')
                .setCustomId('rightModerator')
                .setStyle(ButtonStyle.Success)
              )
            ]
          });
        };

        if(interaction.customId === 'delete') {
          msg.delete();
        };

        if(interaction.customId === 'leftUtility') {
          msg.edit({
            embeds: [
              new EmbedBuilder()
              .setAuthor({ name: `${client.user.username} Command List`, iconURL: client.user.displayAvatarURL({ forceStatic: true, exntesion: 'png' }) })
              .setColor('Navy')
              .setDescription(`Click the button to see the commands!\nSee the category below!\nTotal commands is \`${client.commands.size}\`\nThe prefix is \`${process.env.prefix}\`\n\n**Utility Commands**\`\`\`yaml\nevaluation, help, ping, restart\`\`\`\n_If you found any of bug or glitch at this bot, please report it to **Tokioshy#4631** and will be fixed as soon as possible._`)
              .setImage('https://media.discordapp.net/attachments/1074194891694940170/1076285509321629787/Banner.gif')
              .setFooter({ text: `Requested by ${message.author.tag}` })
              .setTimestamp()
            ],
            components: [
              new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                .setCustomId('leftModerator')
                .setEmoji('⬅️')
                .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                .setCustomId('home')
                .setEmoji('🏠')
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setCustomId('delete')
                .setEmoji('🗑️')
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setEmoji('➡️')
                .setCustomId('rightHome')
                .setStyle(ButtonStyle.Success)
              )
            ]
          });
        };

        if(interaction.customId === 'rightHome') {
          msg.edit({
            embeds: [
              new EmbedBuilder()
              .setAuthor({ name: `${client.user.username} Command List`, iconURL: client.user.displayAvatarURL({ forceStatic: true, exntesion: 'png' }) })
              .setColor('Navy')
              .setDescription(`Click the button to see the commands!\nSee the category below!\nTotal commands is \`${client.commands.size}\`\nThe prefix is \`${process.env.prefix}\`\n\n**Command Categories**\n⛔・\`Moderation\`\n⚙️・\`Utility\`\n\n_If you found any of bug or glitch at this bot, please report it to **Tokioshy#4631** and will be fixed as soon as possible._`)
              .setImage('https://media.discordapp.net/attachments/1074194891694940170/1076285509321629787/Banner.gif')
              .setFooter({ text: `Requested by ${message.author.tag}` })
              .setTimestamp()
            ],
            components: [
              new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                .setCustomId('leftUtility')
                .setEmoji('⬅️')
                .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                .setCustomId('home')
                .setEmoji('🏠')
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setCustomId('delete')
                .setEmoji('🗑️')
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setEmoji('➡️')
                .setCustomId('rightModerator')
                .setStyle(ButtonStyle.Success)
              )
            ]
          });
        };

        if(interaction.customId === 'leftHome') {
          msg.edit({
            embeds: [
              new EmbedBuilder()
              .setAuthor({ name: `${client.user.username} Command List`, iconURL: client.user.displayAvatarURL({ forceStatic: true, exntesion: 'png' }) })
              .setColor('Navy')
              .setDescription(`Click the button to see the commands!\nSee the category below!\nTotal commands is \`${client.commands.size}\`\nThe prefix is \`${process.env.prefix}\`\n\n**Command Categories**\n⛔・\`Moderation\`\n⚙️・\`Utility\`\n\n_If you found any of bug or glitch at this bot, please report it to **Tokioshy#4631** and will be fixed as soon as possible._`)
              .setImage('https://media.discordapp.net/attachments/1074194891694940170/1076285509321629787/Banner.gif')
              .setFooter({ text: `Requested by ${message.author.tag}` })
              .setTimestamp()
            ],
            components: [
              new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                .setCustomId('leftUtility')
                .setEmoji('⬅️')
                .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                .setCustomId('home')
                .setEmoji('🏠')
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setCustomId('delete')
                .setEmoji('🗑️')
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setEmoji('➡️')
                .setCustomId('rightModerator')
                .setStyle(ButtonStyle.Success)
              )
            ]
          });
        };

        if(interaction.customId === 'rightModerator') {
          msg.edit({
            embeds: [
              new EmbedBuilder()
              .setAuthor({ name: `${client.user.username} Command List`, iconURL: client.user.displayAvatarURL({ forceStatic: true, exntesion: 'png' }) })
              .setColor('Navy')
              .setDescription(`Click the button to see the commands!\nSee the category below!\nTotal commands is \`${client.commands.size}\`\nThe prefix is \`${process.env.prefix}\`\n\n**Moderation Commands**\`\`\`yaml\nban, checkwarn, clear, delch, kick, mute, unmute, unwarn, warn\`\`\`\n_If you found any of bug or glitch at this bot, please report it to **Tokioshy#4631** and will be fixed as soon as possible._`)
              .setImage('https://media.discordapp.net/attachments/1074194891694940170/1076285509321629787/Banner.gif')
              .setFooter({ text: `Requested by ${message.author.tag}` })
              .setTimestamp()
            ],
            components: [
              new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                .setCustomId('leftHome')
                .setEmoji('⬅️')
                .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                .setCustomId('home')
                .setEmoji('🏠')
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setCustomId('delete')
                .setEmoji('🗑️')
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setEmoji('➡️')
                .setCustomId('rightUtility')
                .setStyle(ButtonStyle.Success)
              )
            ]
          });
        };

        if(interaction.customId === 'leftModerator') {
          msg.edit({
            embeds: [
              new EmbedBuilder()
              .setAuthor({ name: `${client.user.username} Command List`, iconURL: client.user.displayAvatarURL({ forceStatic: true, exntesion: 'png' }) })
              .setColor('Navy')
              .setDescription(`Click the button to see the commands!\nSee the category below!\nTotal commands is \`${client.commands.size}\`\nThe prefix is \`${process.env.prefix}\`\n\n**Moderation Commands**\`\`\`yaml\nban, checkwarn, clear, delch, kick, mute, unmute, unwarn, warn\`\`\`\n_If you found any of bug or glitch at this bot, please report it to **Tokioshy#4631** and will be fixed as soon as possible._`)
              .setImage('https://media.discordapp.net/attachments/1074194891694940170/1076285509321629787/Banner.gif')
              .setFooter({ text: `Requested by ${message.author.tag}` })
              .setTimestamp()
            ],
            components: [
              new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                .setCustomId('leftHome')
                .setEmoji('⬅️')
                .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                .setCustomId('home')
                .setEmoji('🏠')
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setCustomId('delete')
                .setEmoji('🗑️')
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setEmoji('➡️')
                .setCustomId('rightUtility')
                .setStyle(ButtonStyle.Success)
              )
            ]
          });
        };

        if(interaction.customId === 'rightUtility') {
          msg.edit({
            embeds: [
              new EmbedBuilder()
              .setAuthor({ name: `${client.user.username} Command List`, iconURL: client.user.displayAvatarURL({ forceStatic: true, exntesion: 'png' }) })
              .setColor('Navy')
              .setDescription(`Click the button to see the commands!\nSee the category below!\nTotal commands is \`${client.commands.size}\`\nThe prefix is \`${process.env.prefix}\`\n\n**Utility Commands**\`\`\`yaml\nevaluation, help, ping, restart\`\`\`\n_If you found any of bug or glitch at this bot, please report it to **Tokioshy#4631** and will be fixed as soon as possible._`)
              .setImage('https://media.discordapp.net/attachments/1074194891694940170/1076285509321629787/Banner.gif')
              .setFooter({ text: `Requested by ${message.author.tag}` })
              .setTimestamp()
            ],
            components: [
              new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                .setCustomId('leftModerator')
                .setEmoji('⬅️')
                .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                .setCustomId('home')
                .setEmoji('🏠')
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setCustomId('delete')
                .setEmoji('🗑️')
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setEmoji('➡️')
                .setCustomId('rightHome')
                .setStyle(ButtonStyle.Success)
              )
            ]
          });
        };
      };
    });
  },
};
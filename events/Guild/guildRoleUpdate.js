const client = require('../../index');
const { Events, EmbedBuilder, AuditLogEvent } = require('discord.js');

client.on(Events.GuildRoleUpdate, async (oldRole, newRole) => {
  if(oldRole.guild.id !== client.config.serverId) return;

  let fetchedLogs = await oldRole.guild.fetchAuditLogs({
    limit: 1,
    type: AuditLogEvent.RoleUpdate
  });

  let createLog = fetchedLogs.entries.first();
  let { executor } = createLog;

  let embed = new EmbedBuilder()
  .setAuthor({ name: 'New Role Updated', iconURL: executor.displayAvatarURL({ extension: 'png', foceStatic: true }) })
  .setColor('Navy')
  .addFields(
    { name: `Role`, value: `${oldRole}`, inline: true },
    { name: 'Updater', value: `${executor}`, inline: true }
  )
  .setFooter({ text: `${executor.tag}` })
  .setTimestamp();

  if(oldRole.hexColor !== newRole.hexColor) {
    embed.addFields(
      { name: 'New Color', value: `Before: ${oldRole.hexColor}\nAfter: ${newRole.hexColor}`, inline: true }
    );
  };

  if(oldRole.hoist !== newRole.hoist) {
    embed.addFields(
      { name: 'Display Role', value: `Before: ${oldRole.hoist ? 'Visible' : 'Invisible'}\nAfter: ${newRole.hoist ? 'Visible' : 'Invisible'}`, inline: true }
    );
  };

  if(oldRole.name !== newRole.name) {
    embed.addFields(
      { name: 'New Name', value: `Before: ${oldRole.name}\nAfter: ${newRole.name}`, inline: true }
    );
  };

  if(oldRole.mentionable !== newRole.mentionable) {
    embed.addFields(
      { name: 'Mentionable', value: `Before: ${oldRole.mentionable ? 'Yes' : 'No'}\nAfter: ${newRole.mentionable ? 'Yes' : 'No'}`, inline: true }
    );
  };

  client.channels.cache.get('1077233903758229555').send({ embeds: [embed] });
});
const client = require('../../index');
const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js');

client.on(Events.GuildRoleDelete, async (role) => {
  if(role.guild.id !== client.config.serverId) return;

  let fetchedLogs = await role.guild.fetchAuditLogs({
    limit: 1,
    type: AuditLogEvent.RoleDelete
  });

  let createLog = fetchedLogs.entries.first();
  let { executor } = createLog;

  let embed = new EmbedBuilder()
  .setAuthor({ name: 'New Role Deleted', iconURL: executor.displayAvatarURL({ extension: 'png', foceStatic: true }) })
  .setColor('Navy')
  .addFields(
    { name: 'Role Name', value: `${role.name}`, inline: true },
    { name: 'Creator', value: `${executor}`, inline: true }
  )
  .setFooter({ text: `${executor.tag}` })
  .setTimestamp();

  client.channels.cache.get('1077233903758229555').send({ embeds: [embed] });
});
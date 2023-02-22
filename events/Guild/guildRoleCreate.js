const client = require('../../index');
const { Events, EmbedBuilder, AuditLogEvent } = require('discord.js');

client.on(Events.GuildRoleCreate, async (role) => {
  if(role.guild.id !== process.env.serverId) return;

  let fetchedLogs = await role.guild.fetchAuditLogs({
    limit: 1,
    type: AuditLogEvent.RoleCreate
  });

  let createLog = fetchedLogs.entries.first();
  let { executor } = createLog;

  let embed = new EmbedBuilder()
  .setAuthor({ name: 'New Role Created', iconURL: executor.displayAvatarURL({ extension: 'png', foceStatic: true }) })
  .setColor('Navy')
  .addFields(
    { name: 'Role', value: `${role}`, inline: true },
    { name: 'Creator', value: `${executor}`, inline: true },
    { name: 'Color', value: `${role.hexColor}`, inline: true }
  )
  .setFooter({ text: `${executor.tag}` })
  .setTimestamp();

  client.channels.cache.get('1077233903758229555').send({ embeds: [embed] });
});
const client = require('../index');
const logger = require(`${process.cwd()}/handler/logger`);
const { Events } = require('discord.js');

client.on(Events.Debug, m => logger.debug(m));
client.on(Events.Debug, m => logger.debug(m));
client.on(Events.Warn, m => logger.warn(m));
client.on(Events.Error, m => logger.error(m));
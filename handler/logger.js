const client = require('../index');
const { Events } = require('discord.js');
const pino = require('pino');
const logger = pino();

client.on(Events.Debug, m => logger.debug(m));
client.on(Events.Debug, m => logger.debug(m));
client.on(Events.Warn, m => logger.warn(m));
client.on(Events.Error, m => logger.error(m));
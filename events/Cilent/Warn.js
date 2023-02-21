const client = require('../../index');
const logger = require(`${process.cwd()}/handler/logger.js`);
const { Events } = require('discord.js');

client.on(Events.Warn, m => logger.debug(m));
const client = require('../index');
const pino = require('pino');
const { Events } = require('discord.js');
const transport = pino.transport({
	target: 'pino/file',
	options: { destination: './handler/log.json' },
});
const logger = pino(transport);
module.exports = logger;
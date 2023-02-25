const { Client, GatewayIntentBits, Options, Collection } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  makeCache: Options.cacheWithLimits({
    ...Options.DefaultMakeCacheSettings,
    ReactionManager: 0
  }),
});

client.commands = new Collection();

require('dotenv').config();
require('./handler')(client);

client.login(process.env.token);
module.exports = client;
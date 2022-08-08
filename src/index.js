const { Client, Collection, IntentsBitField, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const Topgg = require('@top-gg/sdk');
const config = require('./Database/config.json');

require('dotenv').config();

const myIntents = new IntentsBitField();
myIntents.add(
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildBans,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.GuildInvites,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.MessageContent
);

const client = new Client({ intents: myIntents });

client.commands = new Collection();
client.topgg = new Topgg.Api(process.env.topggToken);

require('./Systems/giveawaySystem.js')(client);
require('./logs.js')(client);

const functions = fs.readdirSync('./src/Functions').filter(file => file.endsWith('.js'));
const eventsFiles = fs.readdirSync('./src/Events').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./src/Commands');

for (file of functions) {
    require(`./Functions/${file}`)(client);
}

client.handleEvents(eventsFiles, './src/Events');
client.handleCommands(commandFolders, './src/Commands');

client.login(process.env.token);
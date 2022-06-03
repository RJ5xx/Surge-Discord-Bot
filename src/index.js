const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const config = require('./Database/config.json');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});

client.commands = new Collection();

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

client.login(process.env.TOKEN);
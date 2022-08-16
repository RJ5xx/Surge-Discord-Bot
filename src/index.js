const { Client, Collection, IntentsBitField } = require('discord.js');
const fs = require('fs');
const Topgg = require('@top-gg/sdk');
const config = require('./Database/config.json');
const express = require('express');
const path = require('path');

const app = module.exports = express();

app.use(express.static(path.join(__dirname, '/Website')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './Website'));

app.get('/', (req, res) => {
    res.render('home.ejs', {
        guildCount: client.guilds.cache.size,
        userCount: client.guilds.cache.reduce((c, g) => c + g.memberCount, 0)
    });
});

app.get('/home', (req, res) => {
    res.render('home.ejs', {
        guildCount: client.guilds.cache.size,
        userCount: client.guilds.cache.reduce((c, g) => c + g.memberCount, 0)
    });
});

app.get('/invite', (req, res) => {
    res.sendFile(path.join(__dirname + 'invite.html'));
});

app.get('/discord', (req, res) => {
    res.sendFile(path.join(__dirname + 'discord.html'));
});

app.get('/vote', (req, res) => {
    res.sendFile(path.join(__dirname + 'vote.html'));
});

app.listen(3000)

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
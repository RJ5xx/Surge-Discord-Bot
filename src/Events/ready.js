const mongoose = require('mongoose');
const config = require('../Database/config.json')

module.exports = {
    name: 'ready',
    once: true,
    execute: async (client) => {

        console.log(`Ready! Logged in as ${client.user.tag} on Node ${process.version}`);
        console.log(`Inside ${client.guilds.cache.size} servers!`);
        console.log(`Handling ${client.guilds.cache.reduce((acc, g) => acc + g.memberCount, 0)} users!`);
        client.user.setActivity('you!', { type: 'WATCHING' });

        /* const guilds = client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .first(20)
        const guildDetails = guilds.map((guild, index) => {
            return `${index + 1}) Guild Name: ${guild.name}\nGuild Member Count: ${guild.memberCount}`
        }).join("\n")

        console.log(guildDetails) */

        if (!config.mongoURL) return;

        mongoose.connect(config.mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('Connected to the database!');
        }).catch((err) => {
            console.log(err);
        });
    },
};
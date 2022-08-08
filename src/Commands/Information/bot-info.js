const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const config = require('../../Database/config.json');
const ms = require('ms');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('bot-info')
        .setDescription('Shows the bots info!'),
    async execute(interaction, client) {

        await interaction.deferReply();

        const embed = new EmbedBuilder()
            .setTitle(`${interaction.client.user.username}\'s Info!`)
            .setColor(config.color)
            .addFields(
                { name: 'Name', value: `${interaction.client.user.username}`, inline: true },
                { name: 'ID', value: `${interaction.client.user.id}`, inline: true },
                { name: 'Uptime', value: `${ms(interaction.client.uptime)}`, inline: true },
                { name: 'Emoji Count', value: `${interaction.client.emojis.cache.size}`, inline: true },
                { name: 'Channel Count', value: `${interaction.client.channels.cache.size}`, inline: true },
                { name: 'Guild Count', value: `${interaction.client.guilds.cache.size}`, inline: true },
                { name: 'User Count', value: `${interaction.client.guilds.cache.reduce((acc, g) => acc + g.memberCount, 0)}`, inline: true },
                { name: 'Commands', value: `${client.commands.size}`, inline: true },
                { name: 'Node Version', value: `${process.version}`, inline: true },
                { name: 'Discord.js Version', value: `${Discord.version}`, inline: true },
            )
            .setTimestamp()

        interaction.editReply({ embeds: [embed] });
    },
};
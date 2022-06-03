const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channel-info')
        .setDescription('Shows info about a channel!')
        .addChannelOption(option => option.setName('channel')
            .setDescription('Which channel\'s info do you need?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const channel = interaction.options.getChannel('channel');

        const embed = new MessageEmbed()
            .setColor(config.color)
            .setTimestamp()
            .setTitle(`${channel.name}\'s Info!`)
            .addFields(
                { name: 'Channel Name', value: `${channel.name}`, inline: true },
                { name: 'Channel ID', value: `${channel.id}`, inline: true },
                { name: 'Channel Category', value: `${channel.parent}`, inline: true },
                { name: 'Channel Position ', value: `${channel.position}`, inline: true },
                { name: 'Channel Type', value: `${channel.type}`, inline: true },
                { name: 'Created at', value: `${new Date(channel.createdTimestamp).toString().substring(4, 15)}`, inline: true },
            )

        interaction.editReply({ embeds: [embed] });
    },
};
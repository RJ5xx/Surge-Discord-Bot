const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role-info')
        .setDescription('Shows info about a role!')
        .addRoleOption(option => option.setName('role')
            .setDescription('Which role\'s info do you need?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const role = interaction.options.getRole('role');

        const embed = new MessageEmbed()
            .setColor(config.color)
            .setTimestamp()
            .setTitle(`${role.name}\'s Info!`)
            .addFields(
                { name: 'Role Name', value: `${role.name}`, inline: true },
                { name: 'Role ID', value: `${role.id}`, inline: true },
                { name: 'Role Position', value: `${role.position}`, inline: true },
                { name: 'Role Color', value: `${role.hexColor}`, inline: true },
                { name: 'Mentionable', value: `${role.mentionable}`, inline: true },
                { name: 'Created at', value: `${new Date(role.createdAt).toString().substring(4, 15)}`, inline: true },
            )
            .setTimestamp()

        interaction.editReply({ embeds: [embed] });
    },
};
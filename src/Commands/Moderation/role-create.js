const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');
const colors = [
    "BLACK",
    "BLUE",
    "BLURPLE",
    "GREEN",
    "GREY",
    "ORANGE",
    "PURPLE",
    "RED",
    "WHITE",
    "YELLOW"
]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role-create')
        .setDescription('Create a role!')
        .addStringOption(option => option.setName('name')
            .setDescription('What should the role name be?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const name = interaction.options.getString('name');
        const randomColor = colors[Math.floor((Math.random() * 11) + 0)];

        if (!interaction.member.permissions.has('MANAGE_ROLES'))
            return interaction.editReply({ content: `${config.missingPermissions}` });

        interaction.guild.roles.create({
            name: `${name}`,
            color: `${randomColor}`
        }).catch(error => {
            interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
        });

        const embed = new MessageEmbed()
            .setTitle(`@${name} has been created! ${config.successEmoji}`)
            .addFields(
                { name: `Role Name`, value: `${name}`, inline: true },
                { name: `Server`, value: `${interaction.guild.name}`, inline: true },
                { name: `Moderator`, value: `${interaction.member.user.tag}`, inline: true },
            )
            .setColor(config.color)
            .setTimestamp()

        interaction.editReply({ embeds: [embed] });
    },
};
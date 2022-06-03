const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role-delete')
        .setDescription('Delete a role!')
        .addRoleOption(option => option.setName('role')
            .setDescription('Which role do you want to delete?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const role = interaction.options.getRole('role');

        if (!interaction.member.permissions.has('MANAGE_ROLES'))
            return interaction.editReply({ content: `${config.missingPermissions}` });

        interaction.guild.roles.delete(`${role.id}`).catch(error => {
            interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
        });

        const embed = new MessageEmbed()
            .setTitle(`@${role.name} has been deleted! ${config.successEmoji}`)
            .addFields(
                { name: `Role`, value: `${role}`, inline: true },
                { name: `Server`, value: `${interaction.guild.name}`, inline: true },
                { name: `Moderator`, value: `${interaction.member.user.tag}`, inline: true },
            )
            .setColor(config.color)
            .setTimestamp()

        interaction.editReply({ embeds: [embed] });
    },
};
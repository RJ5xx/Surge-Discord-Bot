const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove-role')
        .setDescription('Remove a role from a user!')
        .addUserOption((option) => option.setName('user')
            .setDescription('Who do you want to take the role from?')
            .setRequired(true))
        .addRoleOption((option) => option.setName('role')
            .setDescription('What role do you want to remove from this user?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const user = interaction.options.getMember('user');
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => { });
        const role = interaction.options.getRole('role');

        if (!interaction.member.permissions.has('MANAGE_ROLES'))
        return interaction.editReply({ content: `${config.missingPermissions}` });

        if (interaction.guild.me.roles.highest.comparePositionTo(role) <= 0)
            return interaction.editReply({ content: 'This role is higher than me and I can\'t remove it!' });

        if (!role)
            return interaction.reply({ content: 'I wasn\'t able to find that role!' });

        if (!user.roles.cache.has(role.id))
            return interaction.editReply({ content: 'This user hasn\'t got that role!' });

        member.roles.remove(role.id).catch(error => {
            interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
        });

        const embed = new MessageEmbed()
            .setTitle(`${user.user.tag} has been taken a role from! ${config.successEmoji}`)
            .addFields(
                { name: `Name`, value: `${user.user.tag}`, inline: true },
                { name: `Server`, value: `${interaction.guild.name}`, inline: true },
                { name: `Moderator`, value: `${interaction.member.user.tag}`, inline: true },
                { name: `Role`, value: `<@${role.id}>`, inline: true },
            )
            .setColor(config.color)
            .setTimestamp()

        interaction.editReply({ embeds: [embed] });
    },
};
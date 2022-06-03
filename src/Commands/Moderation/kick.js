const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user from the guild!')
        .addUserOption((option) => option.setName('user')
            .setDescription('Who do you want to kick?')
            .setRequired(true))
        .addStringOption(option => option.setName('reason')
            .setDescription('Why are you kicking this user?')
            .setRequired(true)),
    async execute(interaction, client) {

        await interaction.deferReply();

        const user = interaction.options.getMember('user');
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => { });
        const reason = interaction.options.getString('reason');

        if (!interaction.member.permissions.has('KICK_MEMBERS'))
            return interaction.editReply({ content: `${config.missingPermissions}` });

        if (!member)
            return interaction.editReply({ content: 'I wasn\'t able to find that user!' });

        if (!member.kickable || member.user.id === client.user.id)
            return interaction.editReply({ content: 'I couldn\'t kick that user, or maybe it was me!' });

        if (interaction.member.roles.highest.position <= member.roles.highest.position)
            return interaction.editReply({ content: 'I couldn\'t kick this user because the users role might be higher than yours!' });

        member.kick({ reason }).catch(error => {
            interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
        });

        const embed = new MessageEmbed()
            .setTitle(`${member.user.tag} had been kicked! ${config.successEmoji}`)
            .addFields(
                { name: `Name`, value: `${member.user.tag}`, inline: true },
                { name: `Server`, value: `${interaction.guild.name}`, inline: true },
                { name: `Moderator`, value: `${interaction.member.user.tag}`, inline: true },
                { name: `Reason`, value: `${reason}`, inline: true },
            )
            .setColor(config.color)
            .setTimestamp()

        interaction.editReply({ embeds: [embed] });
    },
};
const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Delete some messages!')
        .addIntegerOption(option => option.setName('amount')
            .setDescription('Number of messages to purge')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const amount = interaction.options.getInteger('amount');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.editReply({ content: `${config.missingPermissions}` });
        }

        if (amount <= 1 || amount > 100) {
            return interaction.editReply({ content: 'You need to input a number between 1 and 99!' });
        }

        interaction.channel.bulkDelete(amount, true).catch(error => {
            return interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
        });

        const purgeEmbed = new EmbedBuilder()
            .setTitle(`${amount} messages deleted! ${config.successEmoji}`)
            .addFields(
                { name: `Messages Deleted`, value: `${amount}`, inline: true },
                { name: `Channel`, value: `<#${interaction.channel.id}>`, inline: true },
                { name: `Server`, value: `${interaction.guild.name}`, inline: true },
                { name: `Moderator`, value: `${interaction.member.user.tag}`, inline: true },
            )
            .setColor(config.color)
            .setTimestamp()

        interaction.channel.send({ embeds: [purgeEmbed] });
    },
};
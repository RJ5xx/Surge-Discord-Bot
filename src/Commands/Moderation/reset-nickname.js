const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('reset-nickname')
        .setDescription('Reset a members nickname!')
        .addUserOption((option) => option.setName('user')
            .setDescription('Whose nickname do you want to reset?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const user = interaction.options.getMember('user');
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(error => { });

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageNicknames)) {
            return interaction.editReply({ content: `${config.missingPermissions}` });
        }

        member.setNickname(member.user.username).catch(error => {
            return interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
        });

        const resetNicknameEmbed = new EmbedBuilder()
            .setTitle(`${member.user.tag}\'s nickname has been reset! ${config.successEmoji}`)
            .addFields(
                { name: `Name`, value: `${member.user.tag}`, inline: true },
                { name: `Server`, value: `${interaction.guild.name}`, inline: true },
                { name: `Moderator`, value: `${interaction.member.user.tag}`, inline: true },
                { name: `New Nickname`, value: `${member.user.username}`, inline: true },
            )
            .setColor(config.color)
            .setTimestamp()

        interaction.editReply({ embeds: [resetNicknameEmbed] });
    },
};
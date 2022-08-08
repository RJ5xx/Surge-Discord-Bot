const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('change-nickname')
        .setDescription('Change a members nickname!')
        .addUserOption((option) => option.setName('user')
            .setDescription('Whose nickname do you want to change?')
            .setRequired(true))
        .addStringOption((option) => option.setName('nickname')
            .setDescription('What should the users nickname be?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const user = interaction.options.getMember('user');
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => { });
        const nickname = interaction.options.getString('nickname');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ChangeNickname)) {
            return interaction.editReply({ content: `${config.missingPermissions}` });
        }

        member.setNickname(nickname).catch(error => {
            interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
        });

        const changeNicknameEmbed = new EmbedBuilder()
            .setTitle(`${member.user.tag}\'s nickname has been changed! ${config.successEmoji}`)
            .addFields(
                { name: `Name`, value: `${member.user.tag}`, inline: true },
                { name: `Server`, value: `${interaction.guild.name}`, inline: true },
                { name: `Moderator`, value: `${interaction.member.user.tag}`, inline: true },
                { name: `New Nickname`, value: `${nickname}`, inline: true },
            )
            .setColor(config.color)
            .setTimestamp()

        interaction.editReply({ embeds: [changeNicknameEmbed] });
    },
};
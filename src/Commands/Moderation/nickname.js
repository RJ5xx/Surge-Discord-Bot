const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('nickname')
        .setDescription('Commands for nickname!')
        .addSubcommand(subcommand => subcommand.setName('change')
            .setDescription('Change an users nickname!')
            .addUserOption(option => option.setName('nickname-change-user')
                .setDescription('Which users nickname do you want to change?')
                .setRequired(true))
            .addStringOption(option => option.setName('nickname-change-name')
                .setDescription('What do you want the users nickname to be?')
                .setRequired(true)),
        )
        .addSubcommand(subcommand => subcommand.setName('reset')
            .setDescription('Reset an users nickname!')
            .addUserOption(option => option.setName('nickname-reset-user')
                .setDescription('Which users nickname do you want to reset?')
                .setRequired(true)),
        ),
    async execute(interaction) {

        await interaction.deferReply();

        const subCommand = interaction.options.getSubcommand();

        const nicknameChangeUser = interaction.options.getUser('nickname-change-user');
        const nicknameChangeName = interaction.options.getString('nickname-change-name');
        const nicknameResetUser = interaction.options.getUser('nickname-reset-user');

        switch (subCommand) {
            case "change": {
                const nicknameChangeMember = interaction.guild.members.cache.get(nicknameChangeUser.id) || await interaction.guild.members.fetch(nicknameChangeUser.id).catch(error => { });

                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageNicknames)) {
                    return interaction.editReply({ content: `${config.missingPermissions}` });
                }

                nicknameChangeMember.setNickname(nicknameChangeName).catch(error => {
                    return interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
                });

                const nicknameChangeEmbed = new EmbedBuilder()
                    .setTitle(`${nicknameChangeMember.user.tag}\'s nickname has been reset! ${config.successEmoji}`)
                    .addFields(
                        { name: 'Name', value: `${nicknameChangeMember.user.tag}`, inline: true },
                        { name: 'Server', value: `${interaction.guild.name}`, inline: true },
                        { name: 'Moderator', value: `${interaction.member.user.tag}`, inline: true },
                        { name: 'Nickname', value: `${nicknameChangeName}`, inline: true },
                    )
                    .setColor(config.color)
                    .setTimestamp()

                interaction.editReply({ embeds: [nicknameChangeEmbed] });
            };
                break;

            case "reset": {
                const nicknameResetMember = interaction.guild.members.cache.get(nicknameResetUser.id) || await interaction.guild.members.fetch(nicknameResetUser.id).catch(error => { });

                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageNicknames)) {
                    return interaction.editReply({ content: `${config.missingPermissions}` });
                }

                nicknameResetMember.setNickname(nicknameResetMember.user.username).catch(error => {
                    return interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
                });

                const nicknameResetEmbed = new EmbedBuilder()
                    .setTitle(`${nicknameResetMember.user.tag}\'s nickname has been reset! ${config.successEmoji}`)
                    .addFields(
                        { name: 'Name', value: `${nicknameResetMember.user.tag}`, inline: true },
                        { name: 'Server', value: `${interaction.guild.name}`, inline: true },
                        { name: 'Moderator', value: `${interaction.member.user.tag}`, inline: true },
                        { name: 'Nickname', value: `${nicknameResetMember.user.username}`, inline: true },
                    )
                    .setColor(config.color)
                    .setTimestamp()

                interaction.editReply({ embeds: [nicknameResetEmbed] });
            };
                break;
        };
    },
};
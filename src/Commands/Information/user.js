const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Commands for user!')
        .addSubcommand(subcommand => subcommand.setName('info')
            .setDescription('Gets an users information!')
            .addUserOption(option => option.setName('user-info')
                .setDescription('Which users information would you like to get?')
                .setRequired(false)),
        )
        .addSubcommand(subcommand => subcommand.setName('avatar')
            .setDescription('Get an users avatar!')
            .addUserOption(option => option.setName('user-avatar')
                .setDescription('Which users avatar would you like to get?')
                .setRequired(false)),
        )
        .addSubcommand(subcommand => subcommand.setName('banner')
            .setDescription('Gets an users banner!')
            .addUserOption(option => option.setName('user-banner')
                .setDescription('Which users banner would you like to get?')
                .setRequired(false)),
        ),
    async execute(interaction) {

        await interaction.deferReply();

        const subCommand = interaction.options.getSubcommand();

        const userInfo = interaction.options.getUser('user-info') || interaction.user;
        const userAvatar = interaction.options.getUser('user-avatar') || interaction.user;
        const userBanner = interaction.options.getUser('user-banner') || interaction.user;

        switch (subCommand) {
            case 'info': {
                const userInfoMember = interaction.guild.members.cache.get(userInfo.id) || await interaction.guild.members.fetch(userInfo.id).catch(error => { });

                const userInfoEmbed = new EmbedBuilder()
                    .setColor(config.color)
                    .setAuthor({ name: `${userInfo.tag}`, iconURL: `${userInfo.displayAvatarURL({ dynamic: true })}` })
                    .setDescription(`Name: ${userInfo.username}\nID: ${userInfo.id}`)
                    .setThumbnail(userInfo.displayAvatarURL({ dynamic: true }))
                    .addFields(
                        { name: 'User since', value: `<t:${Math.round(userInfo.createdTimestamp / 1000)}:d>`, inline: true },
                        { name: 'Member since', value: `<t:${Math.round(userInfoMember.joinedTimestamp / 1000)}:d>`, inline: true },
                        { name: 'Roles', value: `${userInfoMember.roles.cache.map(roles => roles).join(' ') || 'None'}` }
                    )

                interaction.editReply({ embeds: [userInfoEmbed] });
            };
                break;

            case 'avatar': {
                const userAvatarEmbed = new EmbedBuilder()
                    .setColor(config.color)
                    .setImage(userAvatar.displayAvatarURL({ dynamic: true, size: 4096 }))

                interaction.editReply({ embeds: [userAvatarEmbed] });
            };
                break;

            case 'banner': {
                interaction.editReply({ content: 'Coming soon...' });
            };
                break;
        };
    },
};
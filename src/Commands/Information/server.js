const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Commands for server!')
        .addSubcommand(subcommand => subcommand.setName('info')
            .setDescription('Gets the servers information!'),
        )
        .addSubcommand(subcommand => subcommand.setName('avatar')
            .setDescription('Get the servers avatar!'),
        )
        .addSubcommand(subcommand => subcommand.setName('banner')
            .setDescription('Gets the servers banner!'),
        ),
    async execute(interaction) {

        await interaction.deferReply();

        const subCommand = interaction.options.getSubcommand();

        switch (subCommand) {
            case 'info': {
                const serverInfoEmbed = new EmbedBuilder()
                    .setColor(config.color)
                    .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true })}` })
                    .setDescription(`Name: ${interaction.guild.name}\nID: ${interaction.guild.id}\nOwner ID: ${interaction.guild.ownerId}\nMember count: ${interaction.guild.memberCount}\nChannel count: ${interaction.guild.channels.cache.size} \nRole count: ${interaction.guild.roles.cache.size}\nEmoji count: ${interaction.guild.emojis.cache.size}`)
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                    .addFields(
                        { name: 'Created At', value: `<t:${Math.round(interaction.guild.createdAt / 1000)}:d>`, inline: true },
                        { name: 'Rules Channel', value: `${interaction.guild.rulesChannel}`, inline: true },
                        { name: 'Updates Channel', value: `${interaction.guild.publicUpdatesChannel}`, inline: true }
                    )

                interaction.editReply({ embeds: [serverInfoEmbed] });
            };
                break;

            case 'avatar': {
                const serverAvatarEmbed = new EmbedBuilder()
                    .setColor(config.color)
                    .setImage(interaction.guild.iconURL({ dynamic: true, size: 4096 }))

                interaction.editReply({ embeds: [serverAvatarEmbed] });
            };
                break;

            case 'banner': {
                const serverBannerEmbed = new EmbedBuilder()
                    .setColor(config.color)
                    .setDescription(`${interaction.guild.name} doesn\'t have a banner!`)
                    .setImage(interaction.guild.bannerURL({ dynamic: true, size: 4096 }))

                interaction.editReply({ embeds: [serverBannerEmbed] });
            };
                break;
        };
    },
};
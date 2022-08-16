const { ChannelType, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: true,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('server-invite')
        .setDescription('Get an invite link to a server!')
        .addStringOption((option) => option.setName('id')
            .setDescription('What is the servers ID?')
            .setRequired(true)),
    async execute(interaction, client) {

        await interaction.deferReply();

        const id = interaction.options.getString('id');
        const guild = client.guilds.cache.get(id);
        const channel = guild.channels.cache.find(channel => channel.type === ChannelType.GuildText);
        const invite = await channel.createInvite({ maxAge: 0 }).catch(error => {

        });

        const serverInviteEmbed = new EmbedBuilder()
            .setTitle(`Server invite!`)
            .setDescription(`Name: ${guild.name}\nID: ${guild.id}\nInvite link: ${invite.url}`)
            .setColor(config.color)
            .setTimestamp()

        interaction.editReply({ embeds: [serverInviteEmbed] }).catch(error => {
            return interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
        });
    },
};
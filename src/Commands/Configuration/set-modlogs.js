const { SlashCommandBuilder } = require('discord.js');
const modlogs = require('../../Schemas/modlogsModel.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('set-modlogs')
        .setDescription('Set the modlogs channel for this server!')
        .addChannelOption((option) => option.setName('channel')
            .setDescription('Which channel should the modlogs be in?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const channel = interaction.options.getChannel('channel');

        if (!interaction.member.permissions.has('MANAGE_MESSAGES'))
            return interaction.editReply({ content: `${config.missingPermissions}` });

        modlogs.findOne({ guildID: interaction.guild.id }, async (error, data) => {
            if (data) {
                data.modlogsChannelID = channel.id;
                data.save();
            } else {
                new modlogs({
                    guildID: interaction.guild.id,
                    modlogsChannelID: channel.id,
                }).save();
            }
            interaction.editReply({ content: `The modlogs channel has been set to ${channel}!` });
        });
    },
};
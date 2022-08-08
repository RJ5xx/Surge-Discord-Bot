const { SlashCommandBuilder } = require('discord.js');
const joinLeave = require('../../Schemas/joinLeaveModel.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('set-join')
        .setDescription('Set the join channel for this server!')
        .addChannelOption((option) => option.setName('channel')
            .setDescription('Which channel should the join message be in?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const channel = interaction.options.getChannel('channel');

        if (!interaction.member.permissions.has('MANAGE_MESSAGES'))
            return interaction.editReply({ content: `${config.missingPermissions}` });

        joinLeave.findOne({ guildID: interaction.guild.id }, async (error, data) => {
            if (data) {
                data.joinChannelID = channel.id;
                data.save();
            } else {
                new joinLeave({
                    guildID: interaction.guild.id,
                    joinChannelID: channel.id,
                }).save();
            }
            interaction.editReply({ content: `The join channel has been set to ${channel}!` });
        });
    },
};
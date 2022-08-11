const { PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const joinLeave = require('../../Schemas/joinLeaveModel.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('set-leave')
        .setDescription('Set the leave channel for this server!')
        .addChannelOption((option) => option.setName('channel')
            .setDescription('Which channel should the leave message be in?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const channel = interaction.options.getChannel('channel');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.editReply({ content: `${config.missingPermissions}` });
        }

        joinLeave.findOne({ guildID: interaction.guild.id }, async (error, data) => {
            if (data) {
                data.leaveChannelID = channel.id;
                data.save();
            } else {
                new joinLeave({
                    guildID: interaction.guild.id,
                    leaveChannelID: channel.id,
                }).save();
            }
            interaction.editReply({ content: `The leave channel has been set to ${channel}!` });
        });
    },
};
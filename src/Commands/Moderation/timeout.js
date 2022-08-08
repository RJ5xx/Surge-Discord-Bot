const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');
const ms = require('ms');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout a user!')
        .addUserOption((option) => option.setName('user')
            .setDescription('Who do you want to timeout?')
            .setRequired(true))
        .addStringOption((option) => option.setName('time')
            .setDescription('In minutes, how long do you want to timeout this user?')
            .setRequired(true))
        .addStringOption((option) => option.setName('reason')
            .setDescription('Why are you timeouting this user?')
            .setRequired(true)),
    async execute(interaction, client) {

        await interaction.deferReply();

        const user = interaction.options.getMember('user');
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => { });
        const reason = interaction.options.getString('reason');
        const time = interaction.options.getString('time');
        const msTime = ms(time);

        if (member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return interaction.editReply({ content: `${config.missingPermissions}` });
        }

        member.timeout(msTime, reason).catch(error => {
            interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
        });

        const timeoutEmbed = new EmbedBuilder()
            .setTitle(`${member.user.tag} had been timed out! ${config.successEmoji}`)
            .addFields(
                { name: `Name`, value: `${member.user.tag}`, inline: true },
                { name: `Server`, value: `${interaction.guild.name}`, inline: true },
                { name: `Moderator`, value: `${interaction.member.user.tag}`, inline: true },
                { name: `Time`, value: `${time}`, inline: true },
                { name: `Reason`, value: `${reason}`, inline: true },
            )
            .setColor(config.color)
            .setTimestamp()

        interaction.editReply({ embeds: [timeoutEmbed] });
    },
};
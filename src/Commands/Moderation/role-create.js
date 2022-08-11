const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');
const colors = [
    "#000000",
    "#5865F2",
    "#57F287",,
    "#EB459E",
    "#ED4245",
    "#FFFFFF",
    "#FEE75C"
];

module.exports = {
    ownerOnly: false,
    voteOnly: true,
    data: new SlashCommandBuilder()
        .setName('role-create')
        .setDescription('Create a role!')
        .addStringOption(option => option.setName('name')
            .setDescription('What should the role name be?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const name = interaction.options.getString('name');
        const randomColor = colors[Math.floor((Math.random() * 11) + 0)];

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return interaction.editReply({ content: `${config.missingPermissions}` });
        }

        interaction.guild.roles.create({
            name: `${name}`,
            color: `${randomColor}`
        }).catch(error => {
            return interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
        });

        const roleCreateEmbed = new EmbedBuilder()
            .setTitle(`@${name} has been created! ${config.successEmoji}`)
            .addFields(
                { name: `Role Name`, value: `${name}`, inline: true },
                { name: `Server`, value: `${interaction.guild.name}`, inline: true },
                { name: `Moderator`, value: `${interaction.member.user.tag}`, inline: true },
            )
            .setColor(config.color)
            .setTimestamp()

        interaction.editReply({ embeds: [roleCreateEmbed] });
    },
};
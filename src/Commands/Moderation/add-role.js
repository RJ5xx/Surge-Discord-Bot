const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('add-role')
        .setDescription('Add a role to a user!')
        .addUserOption((option) => option.setName('user')
            .setDescription('Who do you want to give the role to?')
            .setRequired(true))
        .addRoleOption((option) => option.setName('role')
            .setDescription('What role do you want to add to this user?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const user = interaction.options.getMember('user');
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => { });
        const role = interaction.options.getRole('role');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return interaction.editReply({ content: `${config.missingPermissions}` });
        }

        if (!role) {
            return interction.editReply({ content: 'I wasn\'t able to find that role!' });
        }

        if (user.roles.cache.has(role.id)) {
            return interaction.editReply({ content: 'This user already has that role!' });
        }

        member.roles.add(role.id).catch(error => {
            interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
        });

        const addRoleEmbed = new EmbedBuilder()
            .setTitle(`${user.user.tag} has been added a role! ${config.successEmoji}`)
            .addFields(
                { name: `Name`, value: `${user.user.tag}`, inline: true },
                { name: `Server`, value: `${interaction.guild.name}`, inline: true },
                { name: `Moderator`, value: `${interaction.member.user.tag}`, inline: true },
                { name: `Role`, value: `<@${role.id}>`, inline: true },
            )
            .setColor(config.color)
            .setTimestamp()

        interaction.editReply({ embeds: [addRoleEmbed] });
    },
};
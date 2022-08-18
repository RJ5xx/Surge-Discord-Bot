const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Commands for role!')
        .addSubcommand(subcommand => subcommand.setName('info')
            .setDescription('Shows info about a role!')
            .addRoleOption(option => option.setName('role-info')
                .setDescription('Which role\'s info do you need?')
                .setRequired(true)),
        )
        .addSubcommand(subcommand => subcommand.setName('add')
            .setDescription('Add a role to an user!')
            .addUserOption((option) => option.setName('role-add-user')
                .setDescription('Which user do you want to add a role to?')
                .setRequired(true))
            .addRoleOption((option) => option.setName('role-add-role')
                .setDescription('Which role are you adding to the user?')
                .setRequired(true)),
        )
        .addSubcommand(subcommand => subcommand.setName('remove')
            .setDescription('Remove a role from an user!')
            .addUserOption((option) => option.setName('role-remove-user')
                .setDescription('Which user do you want to remove a role from?')
                .setRequired(true))
            .addRoleOption((option) => option.setName('role-remove-role')
                .setDescription('Which role are you removing from the user?')
                .setRequired(true)),
        )
        .addSubcommand(subcommand => subcommand.setName('create')
            .setDescription('Create a role!')
            .addStringOption(option => option.setName('role-create')
                .setDescription('What do you want the role to be named as?')
                .setRequired(true)),
        )
        .addSubcommand(subcommand => subcommand.setName('delete')
            .setDescription('Delete a role!')
            .addRoleOption(option => option.setName('role-delete')
                .setDescription('Which role do you want to delete?')
                .setRequired(true)),
        ),
    async execute(interaction) {

        await interaction.deferReply();

        const subCommand = interaction.options.getSubcommand();

        const roleInfo = interaction.options.getString('role-info');
        const roleAddUser = interaction.options.getString('role-add-user');
        const roleAddRole = interaction.options.getRole('role-add-role');
        const roleRemoveUser = interaction.options.getString('role-remove-user');
        const roleRemoveRole = interaction.options.getRole('role-remove-role');
        const roleCreate = interaction.options.getString('role-create');
        const roleDelete = interaction.options.getRole('role-delete');


        switch (subCommand) {
            case "info": {
                const roleInfoEmbed = new EmbedBuilder()
                    .setColor(config.color)
                    .setTimestamp()
                    .setTitle(`${roleInfo.name}\'s Info!`)
                    .addFields(
                        { name: 'Role Name', value: roleInfo.name, inline: true },
                        { name: 'Role ID', value: roleInfo.id, inline: true },
                        { name: 'Role Position', value: roleInfo.position, inline: true },
                        { name: 'Role Color', value: roleInfo.hexColor, inline: true },
                        { name: 'Mentionable', value: roleInfo.mentionable, inline: true },
                        { name: 'Created at', value: `<t:${roleInfo.createdTimestamp}:d>`, inline: true },
                    )
                    .setTimestamp()

                interaction.editReply({ embeds: [roleInfoEmbed] });
            };
                break;

            case "add": {
                const raMember = interaction.guild.members.cache.get(roleAddUser.id) || await interaction.guild.members.fetch(roleAddUser.id).catch(error => { });

                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
                    return interaction.editReply({ content: config.missingPermissions });
                }

                if (!roleAddRole) {
                    return interction.editReply({ content: 'I wasn\'t able to find that role!' });
                }

                if (roleAddUser.roles.cache.has(roleAddRole.id)) {
                    return interaction.editReply({ content: 'This user already has that role!' });
                }

                raMember.roles.add(roleAddRole.id).catch(error => {
                    return interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
                });

                const roleAddEmbed = new EmbedBuilder()
                    .setTitle(`${roleAddUser.user.tag} has been added a role! ${config.successEmoji}`)
                    .addFields(
                        { name: 'Name', value: roleAddUser.user.tag, inline: true },
                        { name: 'Server', value: roleAddUser.guild.name, inline: true },
                        { name: 'Moderator', value: interaction.member.user.tag, inline: true },
                        { name: 'Role', value: roleAddRole, inline: true },
                    )
                    .setColor(config.color)
                    .setTimestamp()

                interaction.editReply({ embeds: [roleAddEmbed] });
            };
                break;

            case "remove": {
                const rrMember = interaction.guild.members.cache.get(roleRemoveUser.id) || await interaction.guild.members.fetch(roleRemoveUser.id).catch(error => { });


                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
                    return interaction.editReply({ content: config.missingPermissions });
                }

                if (!roleRemoveRole) {
                    return interaction.reply({ content: 'I wasn\'t able to find that role!' });
                }

                if (!roleRemoveUser.roles.cache.has(roleRemoveRole.id)) {
                    return interaction.editReply({ content: 'This user hasn\'t got that role!' });
                }

                rrMember.roles.remove(roleRemoveRole.id).catch(error => {
                    return interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
                });

                const roleRemoveEmbed = new EmbedBuilder()
                    .setTitle(`${roleRemoveUser.user.tag} has been taken a role from! ${config.successEmoji}`)
                    .addFields(
                        { name: 'Name', value: roleRemoveUser.user.tag, inline: true },
                        { name: 'Server', value: roleRemoveUser.guild.name, inline: true },
                        { name: 'Moderator', value: interaction.member.user.tag, inline: true },
                        { name: 'Role', value: roleRemoveRole, inline: true },
                    )
                    .setColor(config.color)
                    .setTimestamp()

                interaction.editReply({ embeds: [roleRemoveEmbed] });
            };
                break;

            case "create": {
                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
                    return interaction.editReply({ content: config.missingPermissions });
                }

                interaction.guild.roles.create({
                    name: roleCreate,
                    color: '#FFFFFF'
                }).catch(error => {
                    return interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
                });

                const roleCreateEmbed = new EmbedBuilder()
                    .setTitle(`${roleCreate} has been created! ${config.successEmoji}`)
                    .addFields(
                        { name: 'Role', value: roleCreate, inline: true },
                        { name: 'Server', value: interaction.guild.name, inline: true },
                        { name: 'Moderator', value: interaction.member.user.tag, inline: true },
                    )
                    .setColor(config.color)
                    .setTimestamp()

                interaction.editReply({ embeds: [roleCreateEmbed] });
            };
                break;

            case "delete": {
                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
                    return interaction.editReply({ content: config.missingPermissions });
                }

                interaction.guild.roles.delete(roleDelete.id).catch(error => {
                    return interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
                });

                const roleDeleteEmbed = new EmbedBuilder()
                    .setTitle(`${rdRole.name} has been deleted! ${config.successEmoji}`)
                    .addFields(
                        { name: 'Role', value: roleDelete.name, inline: true },
                        { name: 'Server', value: interaction.guild.name, inline: true },
                        { name: 'Moderator', value: interaction.member.user.tag, inline: true },
                    )
                    .setColor(config.color)
                    .setTimestamp()

                interaction.editReply({ embeds: [roleDeleteEmbed] });
            };
                break;
        };
    },
};
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');
const flags = {
    DISCORD_EMPLOYEE: 'Discord Employee',
    DISCORD_PARTNER: 'Discord Partner',
    BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
    BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
    HYPESQUAD_EVENTS: 'HypeSquad Events',
    HOUSE_BRAVERY: 'House of Bravery',
    HOUSE_BRILLIANCE: 'House of Brilliance',
    HOUSE_BALANCE: 'House of Balance',
    EARLY_SUPPORTER: 'Early Supporter',
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: 'Verified Bot',
    VERIFIED_DEVELOPER: 'Early Verified Bot Developer'
};

function parseBadges(badges_array) {
    const output = [];

    for (let x = 0; x < badges_array.length; x++) {
        const _badge = badges_array[x];
        const badge = flags[_badge];
        output.push(badge);
    }
    return output;
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user-info')
        .setDescription('Shows a users information!')
        .addUserOption(option => option.setName('user')
            .setDescription('Which users information do you want to see?')
            .setRequired(false)),
    async execute(interaction) {

        await interaction.deferReply();

        const member = interaction.options.getMember('user') || interaction.member;
        const user = await member.user.fetch(true);
        const _flags = user.flags.toArray();
        const flags = parseBadges(_flags);

        let flags_string;
        if (flags.length > 0) flags_string = flags.join(',');
        else flags_string = 'No Badges';

        const roles = [];
        member.roles.cache.forEach(r => roles.push(r));

        const embed = new MessageEmbed()
            .setColor(config.color)
            .setTitle(`${member.displayName}\'s Information!`)
            .setThumbnail(member.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Name', value: `${user.username}`, inline: true },
                { name: 'ID', value: `${user.id}`, inline: true },
                { name: 'Account Ping', value: `${user}`, inline: true },
                { name: 'Created At', value: `${new Date(user.createdTimestamp).toString().substring(4, 15)}`, inline: true },
                { name: 'Joined At', value: `${new Date(member.joinedTimestamp).toString().substring(4, 15)}`, inline: true },
                { name: 'Kickable', value: `${member.kickable}`, inline: true },
                { name: 'Bannable', value: `${member.bannable}`, inline: true },
                { name: 'booster', value: `${member.premiumSince ? 'Since ' + member.premiumSince.toLocaleString() : 'Nope'}`, inline: true },
                { name: 'Badges', value: flags_string, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: `${member.displayName}`, iconURL: member.displayAvatarURL({ dynamic: true }) })

        interaction.editReply({ embeds: [embed] });
    },
};

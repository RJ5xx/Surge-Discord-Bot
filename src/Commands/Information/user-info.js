const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');
const flags = {
    STAFF: 'Discord Employee',
    PARTNER: 'Partnered Server Owner',
    BUG_HUNTER_LEVEL_1: 'Bug Hunter Level 1',
    BUG_HUNTER_LEVEL_2: 'Bug Hunter Level 2',
    HYPESQUAD: 'HypeSquad Events Member',
    HYPESQUAD_ONLINE_HOUSE_1: 'House of Bravery Member',
    HYPESQUAD_ONLINE_HOUSE_1: 'House of Brilliance Member',
    HYPESQUAD_ONLINE_HOUSE_1: 'House of Balance Member',
    PREMIUM_EARLY_SUPPORTER: 'Early Nitro Supporter',
    TEAM_PSEUDO_USER: 'User is a team',
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
    ownerOnly: false,
    voteOnly: false,
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

        const embed = new EmbedBuilder()
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
                { name: 'Booster', value: `${member.premiumSince ? 'Since ' + member.premiumSince.toLocaleString() : 'Nope'}`, inline: true },
                // { name: 'Badges', value: flags_string, inline: true }
            )
            .setFooter({ text: `${member.displayName}`, iconURL: member.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()

        interaction.editReply({ embeds: [embed] });
    },
};

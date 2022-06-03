const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user-banner')
        .setDescription('Shows a users banner!')
        .addUserOption(option => option.setName('user')
            .setDescription('Which users banner do you want to see?')
            .setRequired(false)),
    async execute(interaction) {

        await interaction.deferReply();

        const member = interaction.options.getMember('user') || interaction.member;
        const user = await member.user.fetch(true);
        let embed = new MessageEmbed()
            .setTitle(`${member.displayName}\'s banner!`)
            .setDescription(`${member.displayName} doesn\'t have a banner!`)
            .setColor(config.color)

        if (user.banner !== null) {
            embed = new MessageEmbed()
                .setTitle(`${member.displayName}\'s banner!`)
                .setImage(`${user.bannerURL({ size: 4096, dynamic: true })}`)
                .setColor(config.color)
        }

        interaction.editReply({ embeds: [embed] });
    },
};
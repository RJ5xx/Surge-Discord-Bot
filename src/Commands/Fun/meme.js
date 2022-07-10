const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Shows a random meme!'),
    async execute(interaction) {

        await interaction.deferReply();

        const { got } = await import('got');
        got('https://www.reddit.com/r/memes/random/.json').then(response => {
            const content = JSON.parse(response.body);

            const embed = new MessageEmbed()
                .setImage(`${content[0].data.children[0].data.url}`)
                .setFooter({ text: 'That was funny wasn\'t it?' })
                .setColor(config.color)

            interaction.editReply({ embeds: [embed] });
        });
    },
};
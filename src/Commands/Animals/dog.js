const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');
const axios = require('axios');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Shows a random dog!'),
    async execute(interaction) {

        await interaction.deferReply();

        const url = "https://some-random-api.ml/img/dog";

        axios.get(url).then((res) => {
            const dogEmbed = new EmbedBuilder()
                .setColor(config.color)
                .setTitle(`Dog Image!`)
                .setImage(res.data.link)
                .setFooter({ text: 'Aww, how cute' })
                .setTimestamp()

            interaction.editReply({ embeds: [dogEmbed] });
        }).catch(() => {
            interaction.editReply({ content: 'Image not avaibale, try again later!' });
        })
    },
};
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');
const axios = require('axios');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('koala')
        .setDescription('Shows a random koala!'),
    async execute(interaction) {

        await interaction.deferReply();

        const url = "https://some-random-api.ml/img/koala";

        axios.get(url).then((res) => {
            const koalaEmbed = new EmbedBuilder()
                .setColor(config.color)
                .setTitle(`Koala Image!`)
                .setImage(res.data.link)
                .setFooter({ text: 'Aww, how cute' })
                .setTimestamp()

            interaction.editReply({ embeds: [koalaEmbed] });
        }).catch(() => {
            interaction.editReply({ content: 'Image not avaibale, try again later!' });
        })
    },
};
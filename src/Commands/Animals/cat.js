const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Shows a random cat!'),
    async execute(interaction) {

        await interaction.deferReply();

        const url = "https://some-random-api.ml/animal/cat";

        axios
            .get(url)
            .then((res) => {
                const catEmbed = new MessageEmbed()
                    .setColor(config.color)
                    .setTitle(`Cat Image!`)
                    .setImage(res.data.image)
                    .setFooter({ text: 'Aww, how cute' })
                    .setTimestamp()

                interaction.editReply({ embeds: [catEmbed] });
            }).catch(() => {
                interaction.editReply({ content: 'Image not avaibale, try again later!' });
            })
    },
};
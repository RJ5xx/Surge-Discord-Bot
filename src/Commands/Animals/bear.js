const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bear')
        .setDescription('Shows a random bear!'),
    async execute(interaction) {

        await interaction.deferReply();

        const url = "https://some-random-api.ml/animal/bear";

        axios
            .get(url)
            .then((res) => {
                const bearEmbed = new MessageEmbed()
                    .setColor(config.color)
                    .setTitle(`Bear Image!`)
                    .setImage(res.data.image)
                    .setFooter({ text: 'Aww, how cute' })
                    .setTimestamp()

                interaction.editReply({ embeds: [bearEmbed] });
            }).catch(() => {
                interaction.editReply({ content: 'Image not avaibale, try again later!' });
            })
    },
};
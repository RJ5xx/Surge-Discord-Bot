const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout);
const config = require('../../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('diceroll')
        .setDescription('Roll a die!'),
    async execute(interaction) {

        await interaction.deferReply();

        let random = [Math.floor(Math.random() * 6) + 1];

        const diceRolling = new MessageEmbed()
            .setDescription(`Rolling the dice... :game_die:`)
            .setColor(config.color);

        const diceRolled = new MessageEmbed()
            .setTitle('Dice rolled!')
            .setDescription(`${interaction.user.tag}'s magic dice landed on **${random}**!`)
            .setColor('RANDOM')

        interaction.editReply({ embeds: [diceRolling] });
        await wait(3000);
        interaction.editReply({ embeds: [diceRolled] });
    },
};
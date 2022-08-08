const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const wait = require('util').promisify(setTimeout);
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('diceroll')
        .setDescription('Roll a die!'),
    async execute(interaction) {

        await interaction.deferReply();

        let random = [Math.floor(Math.random() * 6) + 1];

        const diceRolling = new EmbedBuilder()
            .setDescription(`Rolling the dice... :game_die:`)
            .setColor(config.color);

        const diceRolled = new EmbedBuilder()
            .setTitle('Dice rolled!')
            .setDescription(`${interaction.user.tag}'s magic dice landed on **${random}**!`)
            .setColor(config.color)

        interaction.editReply({ embeds: [diceRolling] });
        await wait(3000);
        interaction.editReply({ embeds: [diceRolled] });
    },
};
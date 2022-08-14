module.exports = {
    name: 'interactionCreate',
    execute: async (interaction, client) => {

        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        if (command['ownerOnly'] == true) {
            if (interaction.member.id !== '901551680619966514' && interaction.member.id !== '583306636475629617') {
                return interaction.reply({ content: 'Sorry, only the bot owners can run this command!', ephemeral: true });
            };
        };

        if (command['premiumOnly'] == true) {
            if (interaction.member.id !== '') {
                return interaction.reply({ content: 'Sorry, only the premium users can run this command!', ephemeral: true });
            };
        };

        if (command['voteOnly'] == true) {
            vote = await client.topgg.hasVoted(interaction.user.id);

            if (!vote) {
                return interaction.reply({ content: 'Sorry, only the bot voters can run this command! To vote, you can use the \`/vote\` command!\nYou only have to vote once every 12 hours for all commands to work for you!' });
            };
        };

        try {
            command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        };
    },
};

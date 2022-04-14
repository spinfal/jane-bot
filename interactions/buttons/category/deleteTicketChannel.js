/**
 * @file Sample button interaction
 * @author Naman Vrati
 * @since 3.0.0
 */

module.exports = {
    id: "deleteTicketChannel",

    /**
     * @description Deletes the current ticket channel.
     * @author Naman Vrati
     * @param {Object} interaction The Interaction Object of the command.
     */

    async execute(interaction) {
        try {
            interaction.reply({
                content: "Channel will be deleted in 5 seconds. Thanks for reaching out!",
            })
            setTimeout(() => {
                interaction.channel.delete();
            }, 5000);
        } catch (err) {
            console.log(err);

            interaction.reply({
                content: "There was an error while trying to delete the channel. Please try again later. If the problem persists, please contact the bot owner.",
            });
        }

        return;
    },
};

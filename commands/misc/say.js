/**
 * @file Sample ping command
 * @author Naman Vrati
 * @since 1.0.0
 */

module.exports = {
    name: "say",
    description: 'Makes the bot repeat what you say',
    usage: '<message>',
    permissions: 'SEND_MESSAGES',
    args: true,
    guildOnly: true,

    /**
     * @description Executes when the command is called by command handler.
     * @author Naman Vrati
     * @param {Object} message The Message Object of the command.
     * @param {String[]} args The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
     */

    execute(message, args) {
        if (args) {
            message.delete();
            message.channel.send({ content: args.join(" ") });
        }
    },
};

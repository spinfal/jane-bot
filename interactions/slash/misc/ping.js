/**
 * @file Sample help command with slash command.
 * @author Naman Vrati
 * @author Thomas Fournier <thomas@artivain.com>
 * @since 3.0.0
 * @version 3.1.0
 */

// Deconstructed the constants we need in this file.

const { MessageEmbed, Collection, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    // The data needed to register slash commands to Discord.
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription(
            "Returns the bot's latency."
        ),

    /**
     * @description Executes when the interaction is called by interaction handler.
     * @author Naman Vrati
     * @author Thomas Fournier <thomas@artivain.com>
     * @param {*} interaction The interaction object of the command.
     */

    async execute(interaction) {
        /**
         * @type {MessageEmbed}
         * @description Response embed
         */
        const resEmbed = new MessageEmbed()

        resEmbed
            .setTitle("Pong!")
            .setDescription(
                `Latency is ${Date.now() - interaction.createdTimestamp}ms.`
            )
            .setColor("ORANGE");

        // Replies to the interaction!
        await interaction.reply({
            embeds: [resEmbed]
        });
    },
};

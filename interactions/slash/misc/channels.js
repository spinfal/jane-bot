/**
 * @file Sample help command with slash command.
 * @author Naman Vrati
 * @author Thomas Fournier <thomas@artivain.com>
 * @since 3.0.0
 * @version 3.1.0
 */

// Deconstructed the constants we need in this file.

const { MessageEmbed, Collection, MessageActionRow, MessageButton } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    // The data needed to register slash commands to Discord.
    data: new SlashCommandBuilder()
        .setName("channels")
        .setDescription(
            "Create a message with a button that users can use to talk to Staff."
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

        try {
            /**
             * @type {MessageEmbed}
             * @description Channel embed
             */
            const channelEmbed = new MessageEmbed()

            channelEmbed
                .setTitle("Open a new Staff ticket")
                .setDescription(
                    "Click the button below to speak with the Staff."
                )
                .setColor("WHITE");

            const createChannel = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('createNewChannel')
                        .setLabel('Create Ticket')
                        .setStyle('PRIMARY')
                        .setEmoji('❔'),
                );

            interaction.channel.send({ embeds: [channelEmbed], components: [createChannel] });

            resEmbed
                .setTitle("Message created!")
                .setDescription(
                    "Users can now use the button to talk to Staff."
                )
                .setColor("GREEN");

            // Replies to the interaction!
            await interaction.reply({
                embeds: [resEmbed],
                ephemeral: true
            });
        } catch (err) {
            console.log(err);

            resEmbed
                .setTitle("Error while creating message!")
                .setDescription(
                    "Please contact Spin and tell him to fix this stupid shit."
                )
                .setColor("RED");

            // Replies to the interaction!
            await interaction.reply({
                embeds: [resEmbed],
                ephemeral: true
            });
        }
    },
};

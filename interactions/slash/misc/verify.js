/**
 * @file Sample help command with slash command.
 * @author Naman Vrati
 * @author Thomas Fournier <thomas@artivain.com>
 * @since 3.0.0
 * @version 3.1.0
 */

// Deconstructed the constants we need in this file.

const { MessageEmbed, Collection } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../../config.json");

module.exports = {
    // The data needed to register slash commands to Discord.
    data: new SlashCommandBuilder()
        .setName("verify")
        .setDescription(
            "Veriy yourself and get access to the rest of the server."
        )
        .addStringOption((option) =>
            option
                .setName("phrase")
                .setDescription("The verification phrase.")
                .setRequired(true)
        ),

    /**
     * @description Executes when the interaction is called by interaction handler.
     * @author Naman Vrati
     * @author Thomas Fournier <thomas@artivain.com>
     * @param {*} interaction The interaction object of the command.
     */

    async execute(interaction) {
        if (interaction.channel.id !== config.verification.channel_id) {
            return interaction.reply({
                content: "This command can only be used in the verification channel.",
                ephemeral: true
            })
        }

        /**
         * @type {String}
         * @description The current verification phrase
         */
        const verifyPhrase = config.verification.phrase.toLowerCase();

        /**
         * @type {string}
         * @description The "phrase" argument
         */
        const phrase = interaction.options.getString("phrase").toLowerCase();

        /**
         * @type {MessageEmbed}
         * @description Response embed
         */
        const resEmbed = new MessageEmbed()

        if (phrase) {
            resEmbed.setTitle("Verification Status");

            if (phrase === verifyPhrase) {
                resEmbed
                    .setDescription(
                        "You have been successfully verified. You may now access the rest of the server."
                    )
                    .setColor("GREEN");

                // Add the verified role to the user
                const role = interaction.guild.roles.cache.find(role => role.name === config.verification.role);
                interaction.member.roles.add(role);
            } else {
                resEmbed
                    .setDescription(`You provided an incorrect verification phrase! The phrase you provided was: \`${phrase}\``)
                    .setColor("RED");
            };
        } else {
            resEmbed
                .setDescription(
                    "You need to provide the verification phrase to get access to the rest of the server."
                )
                .setColor("RED");
        };

        // Replies to the interaction!
        await interaction.reply({
            embeds: [resEmbed],
            ephemeral: true
        });
    },
};

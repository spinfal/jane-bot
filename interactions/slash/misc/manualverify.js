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
        .setName("manualverify")
        .setDescription(
            "Manually verify a user."
        )
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to manually verify.")
                .setRequired(true)
        ),

    /**
     * @description Executes when the interaction is called by interaction handler.
     * @author Naman Vrati
     * @author Thomas Fournier <thomas@artivain.com>
     * @param {*} interaction The interaction object of the command.
     */

    async execute(interaction) {
        if (!await require("../../checks/checkPerms.js").execute(interaction, "MANAGE_CHANNELS")) return;

        /**
         * @type {string}
         * @description The "phrase" argument
         */
        let user = interaction.options.getUser("user");
        user = interaction.member.guild.members.cache.get(user.id);

        /**
         * @type {MessageEmbed}
         * @description Response embed
         */
        const resEmbed = new MessageEmbed()

        if (user) {
            resEmbed.setTitle("Manual Verification Status");

            if (!user.roles.cache.has(config.verification.role_id)) {
                resEmbed
                    .setDescription(
                        `<@${user.user.id}> has been manually verified by <@${interaction.member.id}>.`
                    )
                    .setColor("GREEN");

                // Add the verified role to the user
                const role = interaction.guild.roles.cache.find(role => role.name === config.verification.role);
                user.roles.add(role);
            } else {
                resEmbed
                    .setDescription("That user is already verified.")
                    .setColor("RED");
            };
        } else {
            resEmbed
                .setDescription(
                    "You need to provide a user that you wish to verify."
                )
                .setColor("RED");
        };

        // Replies to the interaction!
        await interaction.reply({
            embeds: [resEmbed]
        });
    },
};

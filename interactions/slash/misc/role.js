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
        .setName("role")
        .setDescription(
            "Add or remove a role to/from a user."
        )
        .addRoleOption((option) =>
            option
                .setName("role")
                .setDescription("The role to add or remove.")
                .setRequired(true)
        )
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to add/remove a role from.")
                .setRequired(true)
        ),

    /**
     * @description Executes when the interaction is called by interaction handler.
     * @author Naman Vrati
     * @author Thomas Fournier <thomas@artivain.com>
     * @param {*} interaction The interaction object of the command.
     */

    async execute(interaction) {
        if (!await require("../../checks/checkPerms.js").execute(interaction, "MANAGE_ROLES")) return;

        /**
         * @type {string}
         * @description The "role" argument
         */
        const role = interaction.options.getRole("role");

        /**
         * @type {string}
         * @description The "user" argument
         */
        let user = interaction.options.getUser("user");
        user = interaction.member.guild.members.cache.get(user.id);

        /**
         * @type {MessageEmbed}
         * @description Response embed
         */
        const resEmbed = new MessageEmbed()

        try {
            if (user && role) {
                if (!user.roles.cache.has(role.id)) {
                    // Add the role to the user
                    const userRole = interaction.guild.roles.cache.find(r => r.name === role.name);
                    user.roles.add(userRole).then(() => {
                        resEmbed
                            .setDescription(
                                `The role \`${role.name}\` has been **added** to <@${user.user.id}>.`
                            )
                            .setColor("GREEN");

                        interaction.reply({
                            embeds: [resEmbed]
                        });
                    }).catch(err => {
                        resEmbed
                            .setDescription(
                                `The role \`${role.name}\` could not be added to <@${user.user.id}>.`
                            )
                            .setColor("RED");

                        interaction.reply({
                            embeds: [resEmbed]
                        });
                    });

                } else {
                    // Remove the role to the user
                    const userRole = interaction.guild.roles.cache.find(r => r.name === role.name);
                    user.roles.remove(userRole).then(() => {
                        resEmbed
                            .setDescription(
                                `The role \`${role.name}\` has been **removed** from <@${user.user.id}>.`
                            )
                            .setColor("ORANGE");

                        interaction.reply({
                            embeds: [resEmbed]
                        });
                    }).catch(err => {
                        resEmbed
                            .setDescription(
                                `The role \`${role.name}\` could not be removed from <@${user.user.id}>.`
                            )
                            .setColor("RED");

                        interaction.reply({
                            embeds: [resEmbed]
                        });
                    });

                };
            } else {
                resEmbed
                    .setDescription(
                        "You need to provide a role and a user."
                    )
                    .setColor("RED");

                interaction.reply({
                    embeds: [resEmbed]
                });
            };
        } catch (err) {
            resEmbed
                .setDescription(
                    `An error occured while trying to add/remove the role.\n\`\`\`${err}\`\`\``
                )
                .setColor("RED");

            interaction.reply({
                embeds: [resEmbed]
            });
        }
    },
};

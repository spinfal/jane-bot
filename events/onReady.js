/**
 * @file Ready Event File.
 * @author Naman Vrati
 * @since 1.0.0
 */

const config = require("../config.json");

module.exports = {
	name: "ready",
	once: true,

	/**
	 * @description Executes the block of code when client is ready (bot initialization)
	 * @param {Object} client Main Application Client
	 */
	execute(client) {
		console.clear();
		console.log(`Ready! Logged in as ${client.user.tag}`);

		client.user.setActivity(config.status.ACTIVITY, { type: config.status.TYPE });
		/* un-comment to remove all global slash commands
		client.application.commands.set([]);
		*/
	},
};

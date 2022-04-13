/**
 * @file Sample Trigger command.
 * @author Naman Vrati
 * @since 2.0.0
 */

// For now, the only available property is name array. Not making the name array will result in an error.

module.exports = {
	name: ["how do i verify", "how verify", "how can i verify"],

	/**
	 * @description Executes when it is triggered by trigger handler.
	 * @author Naman Vrati
	 * @param {Object} message The Message Object of the trigger.
	 * @param {String[]} args The Message Content of the received message seperated by spaces (' ') in an array
	 */

	execute(message, args) {
		// Put all your trigger code over here. This code will be executed when any of the element in the "name" array is found in the message content.

		message.reply({
			content: "To verify yourself and get access the rest of the server, you need to run `/verify <verify phrase>`.",
		});
	},
};

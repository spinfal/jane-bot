/**
 * @file Sample button interaction
 * @author Naman Vrati
 * @since 3.0.0
 */

const { MessageEmbed, Collection, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
	id: "createNewChannel",

	/**
	 * @description Creates a new channel that users can use to talk to Staff.
	 * @author Naman Vrati
	 * @param {Object} interaction The Interaction Object of the command.
	 */

	async execute(interaction) {
		const everyoneRole = interaction.guild.roles.cache.find(r => r.name === '@everyone');

		interaction.guild.channels.create(`${interaction.user.username}-${interaction.user.discriminator}`, {
			type: 'text',
			permissionOverwrites: [
				{
					id: everyoneRole.id,
					deny: ['VIEW_CHANNEL'],
				},
				{
					id: interaction.user.id,
					allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'ATTACH_FILES'],
				}
			],
		}).then(userChannel => {
			interaction.reply({
				content: `Channel created successfully! You can find it here: <#${userChannel.id}>`,
				ephemeral: true,
			});

			const helpEmbed = new MessageEmbed()
				.setTitle(`Ticket ID: ${Math.floor(Math.random() * 1000000)}`)
				.setDescription("Please explain why you've opened this ticket, Staff will be with you ASAP.")
				.setColor("WHITE");

			const deleteTicket = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('deleteTicketChannel')
						.setLabel('Delete Ticket')
						.setStyle('DANGER')
						.setEmoji('868539464883007498'),
				);

			const helpChannel = interaction.guild.channels.cache.get(userChannel.id);
			helpChannel.send({ content: `Hi ${interaction.user.username}!`, embeds: [helpEmbed], components: [deleteTicket] })
		}).catch(err => {
			console.log(err);

			interaction.reply({
				content: "There was an error while trying to create the channel. Please try again later. If the problem persists, please contact the bot owner.",
				ephemeral: true,
			});
		});
		return;
	},
};

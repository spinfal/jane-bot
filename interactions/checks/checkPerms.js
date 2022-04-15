module.exports = {
    async execute(interaction, reqPerm) {
        if (!interaction.memberPermissions.has(reqPerm)) {
            interaction.reply({
                content: "You do not have the proper permissions to run this command!",
                ephemeral: true
            });
            return false;
        } else {
            return true;
        }
    }
}
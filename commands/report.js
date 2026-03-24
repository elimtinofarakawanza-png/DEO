import { SlashCommandBuilder } from "discord.js";

const REPORT_CHANNEL = "1473615876136767543";

export default {
  data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("Report a user")
    .addUserOption(opt => opt.setName("user").setDescription("User to report").setRequired(true))
    .addStringOption(opt => opt.setName("reason").setDescription("Reason").setRequired(true)),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");

    const channel = interaction.guild.channels.cache.get(REPORT_CHANNEL);

    channel.send({
      embeds: [
        {
          title: "🚨 New Report",
          color: 0xff0000,
          fields: [
            { name: "Reported User", value: user.tag },
            { name: "Reported By", value: interaction.user.tag },
            { name: "Reason", value: reason }
          ],
          timestamp: new Date()
        }
      ]
    });

    interaction.reply({ content: "Your report has been submitted", ephemeral: true });
  }
};

import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a member")
    .addUserOption(opt => opt.setName("user").setDescription("User to ban").setRequired(true))
    .addStringOption(opt => opt.setName("reason").setDescription("Reason"))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") || "No reason provided";

    try {
      await interaction.guild.members.ban(user.id, { reason });
      interaction.reply(`⛔ **${user.tag}** has been banned.\nReason: ${reason}`);
    } catch {
      interaction.reply({ content: "I cannot ban this user", ephemeral: true });
    }
  }
};

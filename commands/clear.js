import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear messages")
    .addIntegerOption(opt => opt.setName("amount").setDescription("Number of messages").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");

    if (amount < 1 || amount > 100)
      return interaction.reply({ content: "Amount must be 1–100", ephemeral: true });

    await interaction.channel.bulkDelete(amount, true);

    interaction.reply(`🧹 Cleared **${amount}** messages`);
  }
};

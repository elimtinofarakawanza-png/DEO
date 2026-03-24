import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout a member")
    .addUserOption(opt => opt.setName("user").setDescription("User to timeout").setRequired(true))
    .addIntegerOption(opt => opt.setName("minutes").setDescription("Minutes").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const minutes = interaction.options.getInteger("minutes");

    const member = interaction.guild.members.cache.get(user.id);

    await member.timeout(minutes * 60 * 1000);

    interaction.reply(`⏳ **${user.tag}** has been timed out for ${minutes} minutes`);
  }
};

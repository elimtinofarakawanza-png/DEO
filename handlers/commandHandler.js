import fs from "fs";
import path from "path";
import { REST, Routes } from "discord.js";

export default async (client) => {
  const commands = [];
  const commandsPath = path.join(process.cwd(), "commands");

  const folders = fs.readdirSync(commandsPath);

  for (const folder of folders) {
    const folderPath = path.join(commandsPath, folder);
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".js"));

    for (const file of files) {
      const command = await import(`${folderPath}/${file}`);
      client.commands.set(command.default.data.name, command.default);
      commands.push(command.default.data.toJSON());
    }
  }

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  try {
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log("Slash commands registered");
  } catch (err) {
    console.error(err);
  }

  client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(err);
      interaction.reply({ content: "Error executing command", ephemeral: true });
    }
  });
};

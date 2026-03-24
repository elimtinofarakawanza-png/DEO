import { Client, GatewayIntentBits, Collection } from "discord.js";
import fs from "fs";
import path from "path";
import "dotenv/config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

// Load command handler
import("./handlers/commandHandler.js").then(handler => {
  handler.default(client);
});

client.once("ready", () => {
  console.log(`DOE is online as ${client.user.tag}`);
});

client.login(process.env.TOKEN);

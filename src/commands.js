const { REST, Routes, SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

const commands = [];

commands.push(
  new SlashCommandBuilder()
    .setName("greeting")
    .setDescription("Ativates daily morning greetings")
    .addStringOption(option =>
      option
        .setName("input")
        .setDescription("Just test")
        .setRequired(true)
        .addChoices({ name: "on", value: "on" }, { name: "off", value: "off" })
    )
);

commands.push(
  new SlashCommandBuilder().setName("quote").setDescription("Get a quote")
);

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

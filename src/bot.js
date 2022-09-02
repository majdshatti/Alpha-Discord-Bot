// Load config variables
require("dotenv").config();
// Axios
const axios = require("axios");
// Cron tasks
const cron = require("node-cron");

// Discord lib
const { Client, GatewayIntentBits } = require("discord.js");

// The client using discord bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Interactions with bot
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  //* /activate daily greetings
  if (interaction.commandName === "activate") {
    cron.schedule("00 59 18 * * *", async () => {
      try {
        let message = await client.channels.fetch(interaction.channel.id);
        message.send("Good morning fellows, Have a wonderful day! :>");
      } catch (e) {
        console.log(e.message);
      }
    });

    await interaction.reply("Daily greeting activated at 09:00AM Wahoooo! :D");
  }

  //* /quote command
  if (interaction.commandName === "quote") {
    //https://zenquotes.io/api/random
    const results = await axios.get("https://zenquotes.io/api/random");
    await interaction.reply(
      results.data[0].q + "\n" + "`" + results.data[0].a + "`"
    );
  }
});

client.login(process.env.DISCORD_TOKEN);

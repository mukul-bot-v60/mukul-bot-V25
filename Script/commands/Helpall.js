const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
  name: "helpall",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  description: "Show all commands",
  commandCategory: "system",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;

  const allCommands = [];

  for (const [name] of commands) {
    if (name && name.trim()) allCommands.push(name.trim());
  }

  allCommands.sort();

  const msg = `╔════════════════════════════╗
║        🌸 SAJIB CHAT BOT 🌸
╠════════════════════════════╣
║ 📜 ALL COMMANDS
╚════════════════════════════╝

${allCommands.map((cmd, i) => `${i + 1}. ${cmd}`).join("\n")}

╔════════════════════════════╗
║         🤖 BOT INFO
╠════════════════════════════╣
║ 🤖 Bot Name : Sajib Chat Bot
║ 👑 Owner    : SAJIB
║ ⚙ Prefix    : ${global.config.PREFIX}
║ 📦 Commands : ${allCommands.length}
║ 🚀 Version  : 2.0.0
╚════════════════════════════╝

💖 Thanks For Using Sajib Chat Bot ❤️`;

  const images = [
    "https://i.imgur.com/gAY4Lcb.jpeg",
    "https://i.imgur.com/JALcsm4.jpeg",
    "https://i.imgur.com/QX8wd8n.jpeg"
  ];

  const img = images[Math.floor(Math.random() * images.length)];
  const path = __dirname + "/cache/helpall.jpg";

  request(img)
    .pipe(fs.createWriteStream(path))
    .on("close", () => {
      api.sendMessage(
        {
          body: msg,
          attachment: fs.createReadStream(path)
        },
        threadID,
        () => fs.unlinkSync(path),
        messageID
      );
    });
};

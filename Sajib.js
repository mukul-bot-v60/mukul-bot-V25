     const { spawn } = require("child_process");
const axios = require("axios");
const logger = require("./utils/log");

///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
///////////////////////////////////////////////////////////

const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  logger("SAJIB CHAT BOT Dashboard Running...", "[ SAJIB ]");
  logger(`Server running on port ${port}`, "[ SERVER ]");
}).on("error", (err) => {
  logger(err.message, "[ ERROR ]");
});

/////////////////////////////////////////////////////////
//========= Create start bot and make it loop =========//
/////////////////////////////////////////////////////////

global.countRestart = global.countRestart || 0;

function startBot(message) {
  if (message) logger(message, "[ SAJIB ]");

  const child = spawn(
    "node",
    ["--trace-warnings", "--async-stack-traces", "Main.js"],
    {
      cwd: __dirname,
      stdio: "inherit",
      shell: true
    }
  );

  child.on("close", (code) => {
    if (code !== 0 && global.countRestart < 5) {
      global.countRestart++;
      logger(
        `Restarting Bot (${global.countRestart}/5)...`,
        "[ RESTART ]"
      );
      startBot();
    } else {
      logger("Bot Stopped!", "[ STOP ]");
    }
  });

  child.on("error", (err) => {
    logger(err.message, "[ ERROR ]");
  });
}

////////////////////////////////////////////////
//========= Check update from Github =========//
////////////////////////////////////////////////

axios
  .get(
    "https://raw.githubusercontent.com/suchi9900/SAJIB---2/main/package.json"
  )
  .then((res) => {
    logger("━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "[ SAJIB ]");
    logger("🌺 SAJIB CHAT BOT 🌺", "[ NAME ]");
    logger(`📦 Package : ${res.data.name}`, "[ PACKAGE ]");
    logger(`🚀 Version : ${res.data.version}`, "[ VERSION ]");
    logger(`📝 Description : ${res.data.description}`, "[ DESCRIPTION ]");
    logger("👨‍💻 Developer : SAJIB", "[ OWNER ]");
    logger("🌐 GitHub : https://github.com/suchi9900/SAJIB---2", "[ GITHUB ]");
    logger("━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "[ SAJIB ]");
  })
  .catch(() => {
    logger("🌺 SAJIB CHAT BOT 🌺", "[ NAME ]");
    logger("👨‍💻 Developer : SAJIB", "[ OWNER ]");
    logger("🌐 GitHub : https://github.com/suchi9900/SAJIB---2", "[ GITHUB ]");
  });

startBot("🌺 Starting SAJIB CHAT BOT...");   

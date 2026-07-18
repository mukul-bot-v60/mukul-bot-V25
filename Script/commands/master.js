module.exports.config = {
  name: "master",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SAJIB",
  description: "Romantic caption for mentioned user",
  commandCategory: "love",
  usages: "@mention",
  cooldowns: 3
};

module.exports.run = async function ({ api, event }) {
  const mention = Object.keys(event.mentions);

  if (!mention.length) {
    return api.sendMessage(
      "💝 একজনকে মেনশন করুন।\n\nউদাহরণ:\n/master @Name",
      event.threadID,
      event.messageID
    );
  }

  const uid = mention[0];
  const name = event.mentions[uid].replace("@", "");

  const captions = [
    `💖 ${name}, তোমার হাসিই আমার দিনের সবচেয়ে সুন্দর মুহূর্ত।`,
    `🌹 ${name}, তোমাকে দেখলেই মনটা ভালো হয়ে যায়।`,
    `💕 ${name}, তোমার কথা ভাবলেই হৃদয়টা ভরে যায়।`,
    `🥀 ${name}, তুমি আমার জীবনের সবচেয়ে সুন্দর অনুভূতি।`,
    `💝 ${name}, তোমার পাশে থাকাই আমার সবচেয়ে বড় সুখ।`,
    `🌸 ${name}, তোমাকে ছাড়া দিনগুলো অসম্পূর্ণ লাগে।`,
    `💞 ${name}, তুমি আমার হৃদয়ের সবচেয়ে প্রিয় মানুষ।`,
    `❤️ ${name}, তোমার জন্য হাজারটা কবিতা লিখতে পারি।`,
    `🌺 ${name}, ভালোবাসা মানেই যেন তুমি।`,
    `💘 ${name}, তোমার একটুখানি হাসিই আমার হাজারো আনন্দের কারণ।`
  ];

  const msg = captions[Math.floor(Math.random() * captions.length)];

  api.sendMessage(
    {
      body: msg,
      mentions: [{
        tag: name,
        id: uid
      }]
    },
    event.threadID,
    event.messageID
  );
};

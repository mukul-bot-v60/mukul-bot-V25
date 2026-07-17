const helpImages = [
    "https://i.imgur.com/gAY4Lcb.jpg",
    "https://i.imgur.com/JALcsm4.jpg",
    "https://i.imgur.com/QX8wd8n.jpg"
];

function downloadImages(callback) {
    const randomUrl = helpImages[Math.floor(Math.random() * helpImages.length)];
    const filePath = path.join(__dirname, "cache", "help_random.jpg");

    request({
        url: randomUrl,
        encoding: null
    })
    .pipe(fs.createWriteStream(filePath))
    .on("close", () => callback([filePath]));
}
downloadImages(files => {
    api.sendMessage(
        {
            body: detail,
            attachment: files.map(file => fs.createReadStream(file))
        },
        threadID,
        () => {
            files.forEach(file => {
                if (fs.existsSync(file)) fs.unlinkSync(file);
            });
        },
        messageID
    );
    downloadImages(files => {
    api.sendMessage(
        {
            body: detailText,
            attachment: files.map(file => fs.createReadStream(file))
        },
        threadID,
        () => {
            files.forEach(file => {
                if (fs.existsSync(file)) fs.unlinkSync(file);
            });
        },
        messageID
    );
});

});
downloadImages(files => {
    api.sendMessage(
        {
            body: text,
            attachment: files.map(file => fs.createReadStream(file))
        },
        threadID,
        () => {
            files.forEach(file => {
                if (fs.existsSync(file)) fs.unlinkSync(file);
            });
        },
        messageID
    );
});

const tesseract = require("node-tesseract-ocr");
const path = require("path");

const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
}

async function convertToText(filePath) {
    console.log(path.join(__dirname, "../" + filePath));
    var text = await tesseract
        .recognize(path.join(__dirname, "../" + filePath), config)
        .then((text) => {
            console.log("Text obtained\n");
            return text;
        })
        .catch((error) => {
            console.log("Error Message");
            console.log(error.message);
            return error.message;
        });
    return text;
};
exports.convertToText = convertToText;


const functions = require("firebase-functions");
const region = "asia-northeast1";

const thailandpost = require("./thailandpost");
const lineApp = require("./lineapp");
const msgTemplate = require("./msgTemplate");

exports.linebot = functions.region(region).https.onRequest(async(request, response) => {
    const event = request.body.events[0];
    const {replyToken, message, type} = event;
    console.log(event);

    if (type === "message" && message.type === "text") {
        const barCode = message.text;
        const trackResult = await thailandpost.getItems(barCode);
        const items = trackResult["response"]["items"][barCode];

        let payload = null;

        if (items.length <= 0) {
            payload = msgTemplate.trackNotFound();
        } else {
            let body = [];
            items.forEach((row) => {
                body.push(msgTemplate.trackBody(row))
            });
            payload = msgTemplate.trackHeader(barCode, body)
        }

        await lineApp.reply(replyToken, payload);
        console.log(JSON.stringify(payload))
    }

    return response.send("Hello from Firebase!").end()
 });
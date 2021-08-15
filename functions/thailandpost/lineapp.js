const axios = require("axios");
const functions = require("firebase-functions");
const accessToken = functions.config().line.access_token;

const LINE_HEADER = {
   "Content-Type": "application/json",
   Authorization: `Bearer ${accessToken}`
}

class lineApp {
   async reply(replyToken, payload) {
       const params = {
           replyToken: replyToken,
           messages: [payload]
        }

        await axios({
            url: 'https://api.line.me/v2/bot/message/reply',
            method: 'POST',
            headers: LINE_HEADER,
            data: params
        }).catch((error) => {
            console.log(error);
        })
   }
}

module.exports = new lineApp();
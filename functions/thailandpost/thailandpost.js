const axios = require("axios");
const functions = require("firebase-functions");
const token = functions.config().thailandpost.tokenkey;

class Thailandpost {

   async getToken() {
       let result = null;
       await axios({
           url: 'https://trackapi.thailandpost.co.th/post/api/v1/authenticate/token',
           method: 'POST',
           headers: {
               'Authorization': `Token ${token}`,
               'Content-Type': 'application/json',
           }
       }).then((response) => {
           result = response.data;
       }).catch((error) => {
           console.log(error);
       })
       return result;
   }

   async getItems(barCode) {
       let result = null;
       const authToken = await this.getToken();
       const params = {
           "status": "all",
           "language": "TH",
           "barcode": [barCode]
       }
       
       await axios({
           url: 'https://trackapi.thailandpost.co.th/post/api/v1/track',
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Token ' + authToken.token
           },
           data: params
       }).then((response) => {
           result = response.data
       }).catch((error) => {
           console.log(error);
       })
       return result;
   }
}

module.exports = new Thailandpost();
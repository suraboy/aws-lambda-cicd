const axios = require("axios");
const { sysConfig } = require("../../../config");

const sendGridConfig = sysConfig.sendgrid;

module.exports.SendEmailWithSendGrid = async (jsonBodyMessage) => {
    return new Promise(async (resolve, reject) => {
        const {endpoint, authorizedKey} = sendGridConfig;

        axios({
            method : 'POST',
            headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${authorizedKey}` },
            data: jsonBodyMessage,
            url: endpoint,
        }).then(res => {
            if (res.status >= 300) {
                throw res.errors;
            }
            resolve(res.statusText);
        }).catch(error => {
            reject(error);
        });
        
    });
}
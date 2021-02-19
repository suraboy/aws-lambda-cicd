'use strict';
const mySQLMasterDb = require('./src/db/sequelize/mysql/index');
const { RequestTrainingApproval } = require("./src/domain");

async function readFileApproval(){
    try {
        await mySQLMasterDb.initialize();
        const results = await RequestTrainingApproval.SFTPReadApproval.InitialService();
        console.log("Good Luck na ja! : " + results);
        return {
            response: results
        }
    } catch (error) {
        console.error("SYSTEM_ERROR", "Throws exception: error main process: ", error);
    }
}

module.exports.index = async (event) => {
    await readFileApproval();
}

readFileApproval();
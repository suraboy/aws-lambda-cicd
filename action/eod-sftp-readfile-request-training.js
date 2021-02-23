'use strict';
const mySQLMasterDb = require('../src/db/sequelize/mysql');
const { RequestTrainingApproval } = require("../src/domain");

async function readFileApproval(){
    try {
        //release code
        const results = await RequestTrainingApproval.SFTPReadApproval.InitialService();
        // await mySQLMasterDb.initialize();
        console.log("Good Luck na ja! : " + results );
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
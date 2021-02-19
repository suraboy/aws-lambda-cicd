'use strict';
const mySQLMasterDb = require('./src/db/sequelize/mysql/index');
const { RequestTrainingApproval } = require("./src/domain");

async function writeFileApproval(){
    try {
        await mySQLMasterDb.initialize();
        const results = await RequestTrainingApproval.SFTPWriteApproval.InitialService();
        console.log("Good Luck na ja! : " + results);
        return {
            response: results
        }
    } catch (error) {
        console.error("SYSTEM_ERROR", "Throws exception: error main process: ", error);
    }
}

module.exports.index = async (event) => {
    await writeFileApproval();
}

writeFileApproval();
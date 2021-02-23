const _ = require('underscore');
const fs = require("fs");
const moment = require("moment-timezone");

const logger = require('../../../../logger');
const { sysConfig } = require("../../../../config");
const { asyncForEach } = require("../../../utils");
const masterdb = require("../../../db/sequelize/mysql");

const { sftpConnectionWithPrivateKey, sftpGetListFile } = require("../../../utils/sftp");
const { writeFileStreamToS3, readFileStreamFromS3 } = require("../../../utils/aws-eod");

const sFTPConfig = sysConfig.sFTP;
const awsConfig = sysConfig.aws;

async function getListEmployeeApprovalStatus(previousDate, currentDate){
    return new Promise(async (resolve, reject) => {
        let whereString = ` WHERE request_training_approver.deleted = false and request_training_approver.enabled = true and request_training_approver.approver_status != 'WAITING_APPROVAL' and request_training_approver.approver_date > '${previousDate}' and request_training_approver.approver_date <= '${currentDate}'`;

        let orderByString = ` ORDER BY request_training_approver.approver_date ASC, request_training_approver.id DESC`;
        let limitString = ` LIMIT 0, 10000`;

        const resultLearnerCoursePage = await masterdb.RequestTrainingApprover.getEmployeeListCommand({ whereString, orderByString, limitString }, "");

        resolve(resultLearnerCoursePage);
    });
}

async function mappingDataSourseToJsonField(resultsList){
    return new Promise(async (resolve, reject) => {
        await asyncForEach(resultsList, async (resultInfo) => {

        });
    });
}


module.exports.InitialService = async (filePath, FileName) => {
    return new Promise(async (resolve, reject) => {
        try{
            const currentDate = `${moment().format('YYYY-MM-DD')} 16:00:00`;
            const previousDate = `${moment().add(-1, 'days').format('YYYY-MM-DD')} 16:00:00`;
            const resultsList = await getListEmployeeApprovalStatus(previousDate, currentDate);
            const mappingJsonField = await mappingDataSourseToJsonField(resultsList);
            console.log(resultsList);
            resolve('test');
        } catch (error){
            const err = {
                message: `Cannot process about sftp to write request training approval`,
                cause: error
            };
            logger.error(error);
            logger.error({ err, error });
        }
    });
}
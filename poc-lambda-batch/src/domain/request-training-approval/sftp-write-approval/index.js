const _ = require('underscore');
const fs = require("fs");
const moment = require("moment-timezone");

const logger = require('./../../../../logger');
const { sysConfig } = require("./../../../../config");
const { asyncForEach } = require("./../../../utils/index");
const masterdb = require("./../../../db/sequelize/mysql");

const { sftpConnectionWithPrivateKey, sftpGetListFile } = require("./../../../utils/sftp");
const { writeFileStreamToS3, readFileStreamFromS3 } = require("./../../../utils/aws-eod");

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


// approver_id: 5,
// user_id: '10100346',
// email: 'Ananya.T@ngerntidlor.com',
// location: 'Head Office',
// position: 'Supervisor Surprise Check Support',
// title_th: 'นางสาว',
// firstname_th: 'อนัญญา',
// lastname_th: 'ทูลมาลา',
// corporate_title: 'Supervisor/Branch Staff 3',
// approver_date: 2021-02-16T12:41:14.000Z,
// approver_status: 'APPROVAL',
// class_code: 'MG_2421-003',
// class_date: '2021-04-27',
// class_name: 'Data Awareness',
// class_registation_date: '2021-02-09',
// class_type: 'Internal',
// career_level_name: 'Sup. - Sr. Sup'


{ useField: "user_id", firstKey: "A", secondKey: "User ID" },
{ useField: "employee_name", firstKey: "B", secondKey: "Name" },
{ useField: "class_name", firstKey: "C", secondKey: "Course Name" },
{ useField: "class_id", firstKey: "D", secondKey: "Class ID" },
{ useField: "class_date", firstKey: "E", secondKey: "Class Date" },
{ useField: "class_type", firstKey: "F", secondKey: "Type" },
{ useField: "application_date", firstKey: "G", secondKey: "Application Date" },
{ useField: "approved_by", firstKey: "H", secondKey: "Approved By" },
{ useField: "approved_on", firstKey: "I", secondKey: "Approved On" },
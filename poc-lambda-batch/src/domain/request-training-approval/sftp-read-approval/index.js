const _ = require('underscore');
const fs = require("fs");
const moment = require("moment-timezone");

const dataSources = require('./data-source');
const dataProcess = require('./data-process');

const logger = require('./../../../../logger');
const { sysConfig } = require("./../../../../config");
const { asyncForEach } = require("./../../../utils/index");

const { sftpConnectionWithPrivateKey, sftpGetListFile } = require("./../../../utils/sftp");
const { writeFileStreamToS3, readFileStreamFromS3 } = require("./../../../utils/aws-eod");

const sFTPConfig = sysConfig.sFTP;
const awsConfig = sysConfig.aws;

let sftpConn;
async function getFileFromSFTP(){
    return new Promise(async (resolve, reject) => {
        try {
            const {sftp_host, sftp_port, sftp_username, sftp_private_key_directory, sftp_directory_read_file} = sFTPConfig;
            sftpConn = await sftpConnectionWithPrivateKey(
                sftp_host,
                sftp_port,
                sftp_username,
                fs.readFileSync(sftp_private_key_directory),
                sftp_directory_read_file
            );

            const sftpFilesList = await sftpGetListFile(sftpConn, sftp_directory_read_file);
            resolve(sftpFilesList);
        } catch (error){
            reject(error);
        }
    });
}

async function storedFileToStorage(sftpFilesList){
    return new Promise(async (resolve, reject) => {
        try{
            const {sftp_directory_read_file} = sFTPConfig;
            let storedFilesList = [];
            await asyncForEach(sftpFilesList, async (sftpFileInfo) => {
                if (sftpFileInfo) {
                    let FileName = sftpFileInfo.name;

                    console.log(FileName)
                    let sftpFilePath = `${sftp_directory_read_file}/${FileName}`;

                    // get file stream
                    let tempFileDSS = fs.createWriteStream(`/tmp/${FileName}`);

                    await sftpConn.get(sftpFilePath, tempFileDSS);

                    let sftpDownloadDate = moment().tz('Asia/Bangkok').format('YYYY-MM-DD');
                    let awsS3FilePath = `${awsConfig.S3.bucket}/LMSCourseRegistation/${sftpDownloadDate}`;

                    let tempStreamObject = fs.createReadStream(`/tmp/${FileName}`);
                    const fileUploadResult = await writeFileStreamToS3({ Bucket: awsS3FilePath, FileName, StreamObject: tempStreamObject});

                    storedFilesList.push({ Bucket: awsS3FilePath, FileName: FileName, TempFilePath: `/tmp/`, SFTPFilePath: sftpFilePath});
                }
            });
            resolve(storedFilesList);
        } catch (error){
            reject(error);
        }
    });
}


async function SFTPReadRequestTrainingApproval(filePath, FileName){
    return new Promise(async (resolve, reject) => {
        const fileRecordsList = await dataSources.ReceiveEmployeeList.getRecordStreamWithMapping(filePath, FileName);
        logger.info("Initial", "Start Manage Receive Request Training Approver");
        await dataProcess.ReceiveEmployeeList.initialDataProcess(fileRecordsList);
        resolve();
    });
}


module.exports.InitialService = async (filePath, FileName) => {
    return new Promise(async (resolve, reject) => {
        try{
            const sftpFilesList = await getFileFromSFTP();

            const storeFilesList = await storedFileToStorage(sftpFilesList);

            await asyncForEach(storeFilesList, async (storeFileInfo) => {
                let storeFileName = storeFileInfo.FileName;
                const storeFileStreamObj = await readFileStreamFromS3(storeFileInfo);
                if (storeFileName.indexOf('.csv') > -1) {

                }

                if (storeFileName.indexOf('.xlsx') > -1) {
                    await SFTPReadRequestTrainingApproval(storeFileInfo.TempFilePath, storeFileName);
                }

                // await sftpConn.delete(storeFileInfo.SFTPFilePath); #remove file on sftp
                fs.unlinkSync(`${storeFileInfo.TempFilePath}${storeFileName}`);
            });
        } catch (error){
            const err = {
                message: `Cannot process about sftp to read request training approval`,
                cause: error
            };
            logger.error(error);
            logger.error({ err, error });
        }
    });
}
const fs = require("fs");
const path = require("path");
let SFTPClient = require('ssh2-sftp-client');

module.exports.sftpConnection = async (host, port, username, password, path) => {
    return new Promise(async (resolve, reject) => {
        try{
            const sftp = new SFTPClient();
            await sftp.connect({ host, port, username, password });
            resolve(sftp);
        } catch (errors) {
            reject(errors);
        }
    });
}

module.exports.sftpConnectionWithPrivateKey = async (host, port, username, privateKeyPath, path) => {
    return new Promise(async (resolve, reject) => {
        try{
            const sftp = new SFTPClient();
            await sftp.connect({ host, port, username, privateKey: privateKeyPath });
            resolve(sftp);
        } catch (errors) {
            reject(errors);
        }
    });
}

module.exports.sftpGetListFile = async (sftpConn, sftpPathReadFile) => {
    return new Promise(async (resolve, reject) => {
        try{
            let sftpList = await sftpConn.list(sftpPathReadFile);
            resolve(sftpList);
        } catch (errors) {
            reject(errors);
        }
    });
}
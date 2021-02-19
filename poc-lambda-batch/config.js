const dotenv = require('dotenv').config();

module.exports.sysConfig = {
    email:{
        from: process.env.EMAIL_SENDER_FROM
    },
    aws: {
        S3: {
            bucket: process.env.AWS_S3_BUCKET_REQUEST_TRAINING,
        }
    },
    logger: {
        nodeId: 'SFTP_BATCH',
        logLevel: 'info',
        logPrettyPrint:  true,
        logColor: true,
        logOneLine: true
    },
    sFTP: {
        sftp_host: process.env.SFTP_LMS_HOST,
        sftp_port: process.env.SFTP_LMS_PORT ? parseInt(process.env.SFTP_LMSPORT) : 22,
        sftp_username: process.env.SFTP_LMS_USERNAME,
        sftp_password: process.env.SFTP_LMS_PASSWORD,
        sftp_directory_readfile: process.env.SFTP_LMS_PATH_READFILE,
        sftp_directory_writefile: process.env.SFTP_LMS_PATH_WRITEFILE,
        sftp_privatekey_directory: process.env.SFTP_LMS_PRIVATE_KEY,
    },
    masterDb: {
        mysql: {
            host: process.env.DB_MASTER_HOST,
            port: process.env.DB_MASTER_PORT ? parseInt(process.env.DB_MASTER_PORT) : 3306,
            user: process.env.DB_MASTER_USERNAME,
            password: process.env.DB_MASTER_PASSWORD,
            database: process.env.DB_MASTER_DATABASE,
            charset: 'utf8mb4',
            ssl: {
                rejectUnauthorized: false
            }
        },
        sequelize: {
            host: process.env.DB_MASTER_HOST,
            port: process.env.DB_MASTER_PORT ? parseInt(process.env.DB_MASTER_PORT) : 3306,
            user: process.env.DB_MASTER_USERNAME,
            password: process.env.DB_MASTER_PASSWORD,
            database: process.env.DB_MASTER_DATABASE,
            dialect: 'mysql'
        }
    },
    sendgrid: {
        endpoint: process.env.SENDGRID_ENDPOINT,
        authorizedKey: process.env.SENDGRID_AUTHORIZED_KEY,
        emailTemplate: {
            managerApprovalId: process.env.SENDGRID_EMAIL_TEMPLATE_MANAGER_APPROVAL_ID
        }
    }
}
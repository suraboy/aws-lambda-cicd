const fs = require("fs");
const _ = require("underscore");
const path = require("path");
const moment = require("moment-timezone");
const { sysConfig } = require("./../../../../../config");
const { asyncForEach } = require("./../../../../utils/index");
const { SendEmailWithSendGrid } = require("./../../../notification/email");
const masterdb = require("./../../../../db/sequelize/mysql");

const sendGridConfig = sysConfig.sendgrid;
const { emailTemplate } = sendGridConfig;

async function getEmployeeInfoLists () {
    return new Promise(async (resolve, reject) => {
        const dbResultsList = await masterdb.BatchEmployeesInfo.getContentListByCondition({
            attributes: {
                exclude: [
                    'created_by', 'deleted', 'deleted_at','deleted_by'
                ]
            },
            where: {
                enabled: true, 
                deleted: false
            }
        });

        resolve(dbResultsList);
    });
}


module.exports.initialDataProcess = async (fileRecordsList) => {
    return new Promise(async (resolve, reject) => {
        const employeeInfoLists = await getEmployeeInfoLists();
        let i=0;
        await asyncForEach(fileRecordsList, async (itemCSV) => {
            const ownerInfo = _.where(employeeInfoLists, {user_id: `${itemCSV.user_id}`});

            let class_date = (itemCSV.class_date != "" && itemCSV.class_date != undefined) ? moment(new Date(itemCSV.class_date)).format("YYYY-MM-DD") : null;

            let application_date = (itemCSV.application_date != "" && itemCSV.application_date != undefined) ? moment(new Date(itemCSV.application_date)).format("YYYY-MM-DD") : null;

            const insertResult = await masterdb.RequestTrainingApprover.insertContent({
                user_id: itemCSV.user_id,
                manager_id: ownerInfo[0].manager_id,
                class_code: itemCSV.class_id,
                class_name: itemCSV.class_name,
                class_date: class_date,
                class_type: itemCSV.class_type,
                class_registation_date: application_date,
                approver_status: 'WAITING_APPROVAL',
                approver_date: null,
                enabled: true,
                created_at: moment().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss'),
                created_by: 'SFTP_EOD',
                deleted: false
            });

            const emailTo = [
                {
                    "email" : (process.env.ENVIROMENT == "Production")? ownerInfo[0].email : "blackcats.n@gmail.com"
                }
            ]

            if (insertResult) {
                const jsonBodyMessage = {
                    "from": {
                        "email": `${sysConfig.email.from}`
                    },
                    "personalizations":[
                        {
                            "to": emailTo,
                            "dynamic_template_data":{
                                "EmployeeName": `${ownerInfo[0].title_th}${itemCSV.employee_name}`,
                                "ClassName": `${itemCSV.class_name}`,
                                "ClassStartDate": `${(class_date != null)? moment(class_date).format("DD/MM/YYYY"): "-"}`,
                                "ClassEndDate": `${(class_date != null)? moment(class_date).format("DD/MM/YYYY"): "-"}`,
                                "ClassRegistrationDate": `${(application_date != null)? moment(application_date).format("DD/MM/YYYY"): "-"}`
                            }
                        }
                    ],
                    "template_id": emailTemplate['managerApprovalId']
                }
                await SendEmailWithSendGrid(jsonBodyMessage);
            }
        });
        resolve("Success");
    });
}
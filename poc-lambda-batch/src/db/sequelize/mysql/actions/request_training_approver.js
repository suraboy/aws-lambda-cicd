const logger = require('../../../../../logger');
const mySQLMasterDb = require('../index');
const {asyncForEach} = require ('../../../../utils');

const dbTable = 'request_training_approver';
module.exports.getContentListByPagination = async (conditions) => {
    try {
        const db = await mySQLMasterDb.connected_orm();
        const extentConditions = Object.assign(conditions, {  });
        const query_result = await db[dbTable].findAndCountAll(extentConditions);
        return query_result;
    } catch (error) {
        const err = {
            message: `Cannot get content list by condition @ table ${dbTable}`,
            cause: error
        };
        logger.error({ err, error });
    }
}
module.exports.getContentListByCondition = async (conditions) => {
    try {
        const db = await mySQLMasterDb.connected_orm();
        const extentConditions = Object.assign(conditions, {
            
        });

        const query_result = await db[dbTable].findAll(extentConditions);
        let responseResult = [];

        if (query_result != undefined) {
            await asyncForEach(query_result, async (item) => {
                responseResult.push(item.dataValues);
            });
        }
        return responseResult;
    } catch (error) {
        const err = {
            message: `Cannot get content list by condition @ table ${dbTable}`,
            cause: error
        };
        logger.error({ err, error });
    }
}

module.exports.getContentItemByCondition = async (conditions) => {
    try {
        const db = await mySQLMasterDb.connected_orm();
        const extentConditions = Object.assign(conditions, {
            
        });

        const query_result = await db[dbTable].findAll(extentConditions);
        let responseResult = [];
        if (query_result.length > 0 && query_result[0] != undefined) {
            responseResult.push(query_result[0].dataValues);
        }
        return responseResult;
    } catch (error) {
        const err = {
            message: `Cannot get content list by condition @ table ${dbTable}`,
            cause: error
        };
        logger.error({ err, error });
    }
}
module.exports.insertContent = async (content) => {
    try {
        const db = await mySQLMasterDb.connected_orm();
        const query_result = await db[dbTable].create(content);
        let responseResult = {};
        if (query_result != undefined && query_result.dataValues != undefined) {
            responseResult = query_result.dataValues;
        }
        return responseResult;
    } catch (error) {
        const err = {
            message: `Cannot get content list by condition @ table ${dbTable}`,
            cause: error
        };
        logger.error({ err, error });
    }
}
module.exports.updateContent = async(content, conditions) => {
    try {
        const db = await mySQLMasterDb.connected_orm();
        const query_result = await db[dbTable].update(content, conditions);
        let responseResult = [];
        if (query_result.length > 0 && query_result[0] != undefined) {
            responseResult.push(query_result[0]);
        }
        return responseResult;
    } catch (error) {
        const err = {
            message: `Cannot get content list by condition @ table ${dbTable}`,
            cause: error
        };
        logger.error({ err, error });
    }
}
module.exports.removeContent = async (content, conditions) => {
    try {
        const db = await mySQLMasterDb.connected_orm();
        const query_result = await db[dbTable].update(content, conditions);
        let responseResult = [];
        if (query_result.length > 0 && query_result[0] != undefined) {
            responseResult.push(query_result[0]);
        }
        return responseResult;
    } catch (error) {
        const err = {
            message: `Cannot get content list by condition @ table ${dbTable}`,
            cause: error
        };
        logger.error({ err, error });
    }
}

// ----------- CUSTOMIZE -------------
module.exports.getEmployeeListCommand = async ({ whereString, orderByString, limitString }, userId) => {
    try {
        const masterInstance = await mySQLMasterDb.initialize();
        const sequelize = masterInstance.conn;

        let sqlFieldStr = ` request_training_approver.id as approver_id, batch_employees_info.user_id, batch_employees_info.email, batch_employees_info.location, batch_employees_info.position , batch_employees_info.title_th, batch_employees_info.firstname_th, batch_employees_info.lastname_th, batch_employees_info.corporate_title, request_training_approver.approver_date, request_training_approver.approver_status, request_training_approver.class_code, request_training_approver.class_date, request_training_approver.class_name, request_training_approver.class_registation_date, request_training_approver.class_type, users_info_level.career_level_name`;

        let sqlFromString = ` FROM request_training_approver request_training_approver
        LEFT JOIN batch_employees_info batch_employees_info ON request_training_approver.user_id = batch_employees_info.user_id LEFT JOIN users_info_level users_info_level ON batch_employees_info.user_id = users_info_level.user_id`;

        let execCountRecord = await getCountQueryCommand( { sqlFromString,  whereString});
        let execPageRecord = await getPageQueryCommand({ sqlFieldStr, sqlFromString, whereString, orderByString, limitString});

        return {
            count: execCountRecord[0][0].totalRecord,
            rows: execPageRecord[0]
        };
    } catch (error) {
        const err = {
            message: `Cannot get content list by condition @ table ${dbTable}`,
            cause: error
        };
        logger.error({ err, error });
    }
}

const getCountQueryCommand = async ({ sqlFromString, whereString}) => {
    try {
        const masterInstance = await mySQLMasterDb.initialize();
        const sequelize = masterInstance.conn;

        let sqlstr = '';

        let sqlCountStr = ` SELECT COUNT(*) as totalRecord ${sqlFromString} ${whereString}`;

        const results = await sequelize.query(sqlCountStr, { raw: false });
        return results;
    } catch (error) {
        const err = {
            message: `Cannot get content list by condition @ table ${dbTable}`,
            cause: error
        };
        logger.error({ err, error });
    }
}

const getPageQueryCommand = async ({ sqlFieldStr, sqlFromString, whereString, orderByString, limitString}) => {
    try {
        const masterInstance = await mySQLMasterDb.initialize();
        const sequelize = masterInstance.conn;

        let sqlPageStr = ` SELECT DISTINCT ${sqlFieldStr} ${sqlFromString} ${whereString} ${orderByString} ${limitString}`;
        console.log(sqlPageStr);
        const results = await sequelize.query(sqlPageStr, { raw: false });
        return results;
    } catch (error) {
        const err = {
            message: `Cannot get content list by condition @ table ${dbTable}`,
            cause: error
        };
        logger.error({ err, error });
    }
}
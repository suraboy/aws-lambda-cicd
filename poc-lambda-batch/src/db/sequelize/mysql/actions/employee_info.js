const logger = require('../../../../../logger');
const mySQLMasterDb = require('../index');
const {asyncForEach} = require ('../../../../utils');

const dbTable = 'batch_employees_info';

module.exports.getContentList = async () => {
    try {
        const db = await mySQLMasterDb.connected_orm();
        const query_result = await db[dbTable].findAll();
        let responseResult = [];
        if (query_result != undefined && query_result.length > 0) {
            responseResult = query_result;
        }
        return responseResult;
    } catch (error) {
        const err = {
            message: `Cannot insert content @ table ${dbTable}`,
            cause: error
        };
        logger.error({ err, error });
    }
}

module.exports.getContentListByPagination = async (conditions) => {
    try {
        const db = await mySQLMasterDb.connected_orm();
        const extentConditions = Object.assign(conditions, {  });
        const query_result = await db[dbTable].findAndCountAll(extentConditions);
        return query_result;
    } catch (error) {
        const err = {
            message: `Cannot get content by item @ table ${dbTable}`,
            cause: error
        };
        logger.error({ err, error });
    }
}


module.exports.checkEmpInfoFromWorkday = async (conditions) => {
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
            message: `Cannot get content by item @ table ${dbTable}`,
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
            message: `Cannot get content by item @ table ${dbTable}`,
            cause: error
        };
        logger.error({ err, error });
    }
}

module.exports.insertContent = async (content) => {
    try {
        const db = await mySQLMasterDb.connected_orm();
        const query_result = await db[dbTable].create(content);
        let responseResult = [];
        if (query_result.length > 0 && query_result[0] != undefined) {
            responseResult.push(query_result[0].dataValues);
        }
        return responseResult;
    } catch (error) {
        const err = {
            message: `Cannot insert content @ table ${dbTable}`,
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


module.exports.getTeamMemberCommand = async ({ whereString, orderByString, limitString }) => {
    try {
        const masterInstance = await mySQLMasterDb.initialize();
        const sequelize = masterInstance.conn;

        let sqlFieldStr = ` coporate_title_career_level.career_level_name, master_learning_level.name as learning_level_name, batch_employees_info.user_id, batch_employees_info.email, batch_employees_info.location, batch_employees_info.position, batch_employees_info.title_th, batch_employees_info.firstname_th, batch_employees_info.lastname_th, batch_employees_info.corporate_title, batch_employees_info.hiring_date`;

        let sqlFromString = ` FROM batch_employees_info batch_employees_info INNER JOIN users_info_level users_info_level ON batch_employees_info.user_id  = users_info_level.user_id 
        LEFT JOIN coporate_title_career_level coporate_title_career_level ON users_info_level.career_level_id  = coporate_title_career_level.id LEFT JOIN master_learning_level master_learning_level ON users_info_level.learning_level_id  = master_learning_level.id`


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

async function getCountQueryCommand ({ sqlFromString, whereString })  {
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

async function getPageQueryCommand({ sqlFieldStr, sqlFromString, whereString, orderByString, limitString}) {
    try {
        const masterInstance = await mySQLMasterDb.initialize();
        const sequelize = masterInstance.conn;

        let sqlPageStr = ` SELECT ${sqlFieldStr} ${sqlFromString} ${whereString} ${orderByString} ${limitString}`;

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

module.exports.updateContent = async (content, conditions) => {
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
            message: `Cannot update content @ table ${dbTable}`,
            cause: error
        }
        logger.error({ err, error });
    }
}
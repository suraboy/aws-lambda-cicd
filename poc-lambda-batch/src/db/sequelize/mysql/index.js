const masterInstance = require('./sequelize');
const orm_models = require('./models');

module.exports.initialize = async () => {
    if (!masterInstance.connected) {
        await masterInstance.connect();
        return masterInstance;
    }
    return masterInstance;
}

module.exports.close = async () => {
    await masterInstance.close();
}

module.exports.connected_orm = async () => {
    const sequelize = masterInstance.conn;
    const DB = orm_models.initialize(sequelize);
    return DB;
}

const batch_employees_info = require('./actions/employee_info');
const request_training_approver = require('./actions/request_training_approver');

module.exports.BatchEmployeesInfo = batch_employees_info;
module.exports.RequestTrainingApprover = request_training_approver;
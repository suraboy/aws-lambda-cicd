const SequelizeORMInstance = require('../connection');
const { sysConfig } = require('../../../../config');

const masterInstance = new SequelizeORMInstance(sysConfig.masterDb.sequelize);
module.exports = masterInstance;
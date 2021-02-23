const fs = require('fs');
const dotenv = require('dotenv').config();


module.exports = {
  development: {
    username: process.env.DB_MASTER_USERNAME || 'admin',
    password: process.env.DB_MASTER_PASSWORD || 'POI2UYTR8',
    database: process.env.DB_MASTER_DATABASE || 'centerized_lms_dev',
    host: process.env.DB_MASTER_HOST || 'mysql-ngerntidlor-centerized-lms-dev.crmieyuze3vh.ap-southeast-1.rds.amazonaws.com',
    port: process.env.DB_MASTER_PORT ? parseInt(process.env.DB_MASTER_PORT) : 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username: process.env.DB_MASTER_USERNAME || 'admin',
    password: process.env.DB_MASTER_PASSWORD || 'POI2UYTR8',
    database: process.env.DB_MASTER_DATABASE || 'centerized_lms_dev',
    host: process.env.DB_MASTER_HOST || 'mysql-ngerntidlor-centerized-lms-dev.crmieyuze3vh.ap-southeast-1.rds.amazonaws.com',
    port: process.env.DB_MASTER_PORT ? parseInt(process.env.DB_MASTER_PORT) : 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: process.env.DB_MASTER_USERNAME || 'admin',
    password: process.env.DB_MASTER_PASSWORD || 'POI2UYTR8',
    database: process.env.DB_MASTER_DATABASE || 'centerized_lms_dev',
    host: process.env.DB_MASTER_HOST || 'mysql-ngerntidlor-centerized-lms-dev.crmieyuze3vh.ap-southeast-1.rds.amazonaws.com',
    port: process.env.DB_MASTER_PORT ? parseInt(process.env.DB_MASTER_PORT) : 3306,
    dialect: 'mysql'
  }
};



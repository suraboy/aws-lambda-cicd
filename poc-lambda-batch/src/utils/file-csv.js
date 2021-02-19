const fs = require("fs");
const csv = require("fast-csv");
const { Parser } = require('json2csv');

module.exports.createCSV = async (data, dirFile) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ws = fs.createWriteStream(dirFile, { encoding: 'utf8' });
            csv.write(data, { headers: true }).pipe(ws);
            resolve();
        } catch (error) {
            console.error("SYSTEM_ERROR", "Throws exception: error process create CSV file: ", error);
            reject(error);
        }
    });
};

module.exports.convertJsonToCSV = async (fields, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const json2csvParser = new Parser({ fields });
            const tsv = json2csvParser.parse(data);
            resolve(tsv);
        } catch (error) {
            console.error("SYSTEM_ERROR", "Throws exception: error process create CSV file: ", error);
            reject(error);
        }
    });
};

module.exports.readCSVStream = async(csvStreamData, FileName, skipRows) =>{
    return new Promise(async (resolve, reject) => {
        const rows = [];
        const parser = csv.parseStream(csvStreamData, { headers: true, skipRows: skipRows }).on("data", function (row) {
            rows.push(row);
        }).on("end", function (rowCount) {
            console.log(`Total record in CSV file: ${rowCount} rows, FileName: ${FileName}`)
            resolve(rows);
        });
    });
}


module.exports.readCSV = async (dirFile, fileName, skipRows) => {
    return new Promise(async (resolve, reject) => {
        try {
            const rows = [];
            fs.createReadStream(dirFile)
                .pipe(csv.parse({ headers: true, skipRows: skipRows }))
                .on('error', (error) => {
                    console.error("SYSTEM_ERROR", "Function: error process read CSV file: ", error);
                    reject(error)
                })
                .on('data', (row) => {
                    rows.push(row);
                })
                .on('end', (rowCount) => {
                    console.log(`Total record in CSV file: ${rowCount} rows, FileName: ${fileName}`)
                    resolve(rows);
                });
        } catch (error) {
            console.error("SYSTEM_ERROR", "Throws exception: error process read CSV file: ", error);
            reject(error);
        }
    });
}

module.exports.readCSVStreamCustomized = async(csvStreamData, FileName, { headers, skipRows, delimiter, quote, escape }) =>{
    return new Promise(async (resolve, reject) => {
        const rows = [];
        const parser = csv.parseStream(csvStreamData, { headers, skipRows, delimiter, quote, escape }).on("data", function (row) {
            rows.push(row);
        }).on("end", function (rowCount) {
            console.log(`Total record in CSV file: ${rowCount} rows, FileName: ${FileName}`)
            console.log('process finished');
            resolve(rows);
        });
    });
}

module.exports.readCSVCustomized = async (dirFile, fileName, { headers, skipRows, delimiter, quote, escape }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const rows = [];
            fs.createReadStream(dirFile)
                .pipe(csv.parse(
                    { headers, skipRows, delimiter, quote, escape }
                ))
                .on('error', (error) => {
                    console.log("---------------");
                    console.log(error);
                    console.log("---------------");
                    console.error("SYSTEM_ERROR", "Function: error process read CSV file: ", error);
                    reject(error)
                })
                .on('data', (row) => {
                    rows.push(row);
                })
                .on('end', (rowCount) => {
                    console.log(`Total record in CSV file: ${rowCount} rows, FileName: ${fileName}`)
                    resolve(rows);
                });
        } catch (error) {
            console.log("---------------");
            console.log(error);
            console.log("---------------");
            console.error("SYSTEM_ERROR", "Throws exception: error process read CSV file: ", error);
            reject(error);
        }
    });
}

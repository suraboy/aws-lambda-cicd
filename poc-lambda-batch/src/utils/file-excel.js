const fs = require("fs");
const path = require("path");
const excelToJson = require('convert-excel-to-json');

module.exports.readExcel = async (dirFile, fileName, tempSheetName, headerRows) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sheetName = (tempSheetName.length == 0) ? [tempSheetName] : tempSheetName;

            const result = excelToJson({
                source: fs.readFileSync(dirFile),
                header: {
                    rows: headerRows
                },
                sheets: sheetName
            });

            let retureResult = [];
            if (sheetName.length > 0) {
                sheetName.forEach(sheetNameItem => {
                    console.log(`Total record in Excel file: ${result[sheetNameItem].length} rows, FileName: ${fileName} - SheetName: ${sheetNameItem}`);
                    retureResult = result[sheetNameItem];
                });
                
            } else {
                console.log(`Total record in Excel file: ${result[sheetName].length} rows, FileName: ${fileName} - SheetName: ${sheetName}`);
                retureResult = result[sheetName];
            }

            resolve(retureResult);
        } catch (error) {
            console.error("SYSTEM_ERROR", "Throws exception: error process read Excel file: ", error);
            reject(error);
        }
    });
}

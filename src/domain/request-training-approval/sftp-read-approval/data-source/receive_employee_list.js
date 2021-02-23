const fs = require("fs");
const _ = require("underscore");
const path = require("path");

const { readExcel } = require("../../../../utils/file-excel");
const { sysConfig } = require("../../../../../config");
const { asyncForEach } = require("../../../../utils");

async function getRecordFromExcel(dirFile, fileName, tempSheetName, headerRows) {
    return new Promise(async (resolve, reject) => {
        // INGEST DATA FROM Excel FILE
        const dirFileName = path.resolve(
            dirFile,
            fileName
        );

        console.log(dirFileName);
        const recordsExcelList = await readExcel(
            dirFileName,
            fileName,
            tempSheetName,
            headerRows
        );
        
        resolve(recordsExcelList);
    });
}

async function mappingRecord(recordsFileList) {
    return new Promise(async (resolve, reject) => {
        const fieldsCommon = [
            { useField: "user_id", firstKey: "A", secondKey: "User ID" },
            { useField: "employee_name", firstKey: "B", secondKey: "Name" },
            { useField: "class_name", firstKey: "C", secondKey: "Course Name" },
            { useField: "class_id", firstKey: "D", secondKey: "Class ID" },
            { useField: "class_date", firstKey: "E", secondKey: "Class Date" },
            { useField: "class_type", firstKey: "F", secondKey: "Type" },
            { useField: "application_date", firstKey: "G", secondKey: "Application Date" },
            { useField: "approved_by", firstKey: "H", secondKey: "Approved By" },
            { useField: "approved_on", firstKey: "I", secondKey: "Approved On" },
        ]

        const recordsList = [];
        await asyncForEach(recordsFileList, async (itemCSV) => {
            const getKeyItemCSV = _.keys(itemCSV);
            let itemObj = {};
            await asyncForEach(getKeyItemCSV, async (keyItemCSV) => {
                const findFieldsCommon = _.where(fieldsCommon, { firstKey: keyItemCSV });
                if (findFieldsCommon != "" && findFieldsCommon.length > 0) {
                    itemObj[findFieldsCommon[0]['useField']] = (itemCSV[keyItemCSV] != "") ? itemCSV[keyItemCSV] : "";
                }
            });
            recordsList.push(itemObj);
        });
        resolve(recordsList);
    });
};

module.exports.getRecordWithMapping = async () => {
    return new Promise(async (resolve, reject) => {
        const recordsCSVList = await getRecordFromCSV();
        const recordsList = await mappingRecord(recordsCSVList);
        resolve(recordsList);
    });
}

module.exports.getRecordStreamWithMapping = async (filePath, FileName) => {
    return new Promise(async (resolve, reject) => {
        const recordsFileList = await getRecordFromExcel(filePath, FileName, ['Sheet1'] ,2);
        const recordsList = await mappingRecord(recordsFileList);
        resolve(recordsList);
    });
}

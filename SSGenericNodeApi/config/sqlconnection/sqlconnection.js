
'use strict';
const sql = require('mssql/msnodesqlv8');
const connectionString = require("./connectionstring")("sqlDbAppt");
const mainPool = new sql.ConnectionPool(connectionString).connect();
const prepareParameters = require("./parameter");
const prepareResult = require("./response");

module.exports = (_schema, _payLoad, _cParams = {}) => {
    return new Promise((resolve, reject) => {
        mainPool.then((pool) => {
            let currentPool = pool.request();
            currentPool = prepareParameters(sql, currentPool, _schema, _payLoad);
            if (currentPool && currentPool.ERROR) {
                reject(currentPool);
            }
            else {
                currentPool.execute(_schema.SpName, (err, result) => {
                    if (err) reject({ "ERROR": "ERROR_WHILE_EXECUTING_PROCEDURE", "MESSAGE": err });
                    else {
                        resolve(prepareResult(result, _cParams.IS_MULTI_RESULTSET, _cParams.IS_LOAD_AJAX, _cParams.URL));
                    }
                });
            }
        }).catch((err) => {
            reject({ "ERROR": "ERROR_WHILE_POOL_CREATION", "MESSAGE": err.message });
        });
    });
};
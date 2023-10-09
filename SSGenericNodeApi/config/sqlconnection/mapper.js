const sqlDBAppt = require("../sqlconnection/sqlconnection");

module.exports = (currentObj, payload, cParams) => {
    return new Promise((resolve, reject) => {
        if ((currentObj.Server == "SQL") && currentObj.Database == "APPT") {
            sqlDBAppt(currentObj, payload, cParams).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        }
    });
}
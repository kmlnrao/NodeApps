const config = require("./appconfig");
if (!config.NODE_ENV) config.NODE_ENV = "development";

const connectionObj = {
	"production": {
        "ports": {
            "appt": 10001,
        },
        "sqlDbAppt": {
            "user": "sa",
            "password": "Suvarna$123",
            "server": "DESKTOP-9T2BC2M",
            "database": "Rao_Test",
            "driver":"msnodesqlv8",
			"port":1433,
            "connectionTimeout": 60000,
            "requestTimeout": 60000,
            options: {
                trustedConnection: true
              }
        }
    }
};

module.exports = (name) => {
    let env = config.NODE_ENV;
    /** This Is Just Maniplation of environment variable 
     *  You can set this variable at application start page
    */
    if (process.env.CUSTOM_NODE_ENV) env = process.env.CUSTOM_NODE_ENV;

    if (connectionObj && connectionObj[env]) return connectionObj[env][name];
    else {
        console.log(`No connection string(${name}) found with node environment of ${env}`);
        process.exit(1);
    }
}
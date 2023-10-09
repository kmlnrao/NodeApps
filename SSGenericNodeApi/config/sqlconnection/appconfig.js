let dirPath = __dirname;
dirPath = dirPath.replace(/\\/gm, "/") + "/";

module.exports = {
    "HOST": "AAYUSH",
    "NODE_ENV": "production",
    "DIR_PATH": dirPath,
	"APP_DIR_PATH": "E://hosting/prod/op/ui/",
    "TIMEZONE_OFFSET": 0,
    "OP_SMS_EMAIL_URL": "http://localhost:10001/smsEmail/op/",
    "FB_SMS_EMAIL_URL": "http://localhost:10001/smsEmail/fb/",
    "HIMS_PDF_BASE_PATH": "",//http://lab.doctor9.com/",
    "REDIS_URL": "http://localhost:1OOO3/redis/",
    "SALCK_URL": "",
    "SLACK_ENABLE": false,
    "DAYS_TO_KEEP_LOG": 10,
    "LOG_METHOD_COUNT": "N"
}


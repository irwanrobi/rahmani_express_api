const dotenv = require('dotenv');
dotenv.config()

const APP_CONFIG = {
    APP: {
        NAME: process.env.npm_package_name,
        VERSION: process.env.npm_package_version,
        BASE_URL: process.env.BASE_URL,
        PORT: process.env.PORT,
        CONSUMER_URL: [
            'http://localhost:3000', 'https://solusidokumen.xyz', 'https://konsultanlegalisasi.com'
        ],
    },
    DB: {
        HOST: process.env.DB_CONNECT
    },
    JWT_SECRET: process.env.JWT_SECRET
}

module.exports = APP_CONFIG;
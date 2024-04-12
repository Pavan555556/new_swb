const { Sequelize } = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect : 'postgres',
    host : 'localhost',
    port : 5432,
    logging : false
});

(async function main() {
    try {
        await sequelize.authenticate();
        console.log("DateBase Connected Successfully");
        // await sequelize.sync({ force: true });
        // console.log('All models were synchronized successfully.');
    }
    catch(error) {
        console.error("Unable to connect to the DataBase: ", error);
    }
})();



module.exports = {sequelize};
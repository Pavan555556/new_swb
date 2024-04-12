const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/db");


const DummyUser = sequelize.define("DummyUser", {
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : true,
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    }
}, {
    tableName : "dummyUsers",
    timestamps : false
    
}
)

DummyUser.sync({alter : true});

module.exports = DummyUser;
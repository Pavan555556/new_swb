const {Sequelize} = require('sequelize')
const {sequelize} = require('../config/db')
const User = require('./users')
const Investment = require('./investments')

const Transaction = sequelize.define('Transaction', {
  transaction_id: {
    type: Sequelize.UUID,
    primaryKey: true,
    
  },
  investment_id: {
    type: Sequelize.UUID,
    references: {
      model: Investment, // 'Investments' is the table name of the Investment table
      key: 'investment_id', // 'id' is the column name in the Investment table to reference
    },
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User, // 'Users' is the table name of the Users table
      key: 'user_id', // 'id' is the column name in the Users table to reference
    },
  },
  transaction_type: {
    type: Sequelize.ENUM,
    values: ['sip', 'withdrawal', 'transfer', 'refund', 'interest'],
    validate: {
      isIn: {
        args: [['sip', 'withdrawal', 'transfer', 'refund', 'interest']],
        msg: 'Invalid transaction type'
      }
    }
  },
  amount: {
    type: Sequelize.INTEGER,
    validate:{
      isInt:{
        msg: 'enter Integer'
      }
    }
  },
  Transaction_date: {
    type: Sequelize.DATE
  },
},
  {
    timestamps: false,
    tablename: "Transaction"
  }
);

(async () => {
  await Transaction.sync({ alter: true });
  console.log("Transaction Table altered successfully");
})();

module.exports = { Transaction }
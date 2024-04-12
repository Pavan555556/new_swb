const { DataTypes, Sequelize } = require('sequelize');
const {sequelize} = require('../config/db'); // Assuming you have configured your Sequelize instance in a separate file

const Plan = sequelize.define(
  "plans",
  {
    plan_id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    duration: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1, // assuming the minimum duration is 1 month
      },
    },
    return_value: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0.01, // assuming the minimum return value is 0.01
      },
    },
  },
  {
    timestamps: false,
    
  }
);

// Plan.associate = (models) => {
//   Plan.hasMany(models.investments, {
//     sourceKey: "plan_id",
//     foreignKey: "Plan_id",
//     as: "plan"
//   });
// };

(async () => {
  await Plan.sync({ alter: true });
  console.log("Plan Table altered successfully");
})();

module.exports = Plan;

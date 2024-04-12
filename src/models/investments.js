const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./users");
const Plan = require("./plans");

const Investment = sequelize.define('investments', {
  investment_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  // plan_id: {
  //   type: DataTypes.UUID,
  //   allowNull: false,
  //   references: {
  //     model: Plan,
  //     key: 'plan_id'
  //   }
  // },
  sip_amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  total_amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  sip_frequency: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Investment.belongsTo(User, { foreignKey: "user_id" });

Investment.associate = (models) => {
  Investment.belongsTo(models.users, {
    sourceKey: "user_id",
    foreignKey: "user_id",
    as: "investments"
  });
};

// Investment.associate = (models) => {
//   Investment.belongsTo(models.Plan, {
//     sourceKey: "plan_id",
//     foreignKey: "plan_id",
//     as: "investments"
//   });
// };

Investment.sync({alter : true});

module.exports = Investment;



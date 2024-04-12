const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");


const User = sequelize.define('users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlphabetic: function(value) {
        if (!/^[A-Za-z\s]+$/.test(value)) {
          throw new Error('Full name must contain only alphabetic characters');
        }
      }
    }
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
    isAlphabetic: function(value) {
        if (!/^[A-Za-z\s]+$/.test(value)) {
          throw new Error('Full name must contain only alphabetic characters');
        }
      }
    }
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false, 
    validate: {
    isAlphabetic: function(value) {
        if (!/^[A-Za-z\s]+$/.test(value)) {
          throw new Error('Full name must contain only alphabetic characters');
        }
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Assuming email should be unique
    validate: {
      isEmail: true, // Ensures email format is valid
      containsAtSomething: function(value) {
        if (!value.includes('@')) {
          throw new Error('Email must contain "@"');
        }
      }
    }
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isTenDigitNumber: function(value) {
        if (!/^\d{10}$/.test(value)) {
          throw new Error('Phone number must be a ten-digit number');
        }
      }
    }
  },
  registration_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  last_login_date: {
    type: DataTypes.DATE
  },
  pan_number: {
    type: DataTypes.STRING,
    allowNull : true,
    validate: {
      isAlphanumeric: true,
      isExactlyTenCharacters: function(value) {
        if (!/^[a-zA-Z0-9]{10}$/.test(value)) {
          throw new Error('PAN number must be exactly 10 alphanumeric characters');
        }
      }
    }
  },
  adhaar_number: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isTwelveDigitNumber: function(value) {
        if (!/^\d{12}$/.test(value)) {
          throw new Error('Aadhaar number must be a twelve-digit number');
        }
      }
    }
  },
  address: {
    type: DataTypes.STRING
  },
  name_on_pan: {
    type: DataTypes.STRING,
    allowNull : true,
    validate: {
      isAlphabetic: function(value) {
        if (!/^[A-Za-z\s]+$/.test(value)) {
          throw new Error('Full name must contain only alphabetic characters');
        }
      }
    }
  },
  name_on_adhaar: {
    type: DataTypes.STRING,
    allowNull : true,
    validate: {
      isAlphabetic: function(value) {
        if (!/^[A-Za-z\s]+$/.test(value)) {
          throw new Error('Full name must contain only alphabetic characters');
        }
      }
    }
  },
});

// Synchronize the model with the database
// User.hasMany(Investment, { foreignKey: 'user_id' });

User.associate = (models) => {
  User.hasMany(models.investments, {
    sourceKey: "user_id",
    foreignKey: "user_id",
    as: "users"
  });
};

User.sync({alter : true});

module.exports = User;

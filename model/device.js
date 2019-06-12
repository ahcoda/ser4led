const sequelize = require("./sequelize");
const Sequelize = require("sequelize");
const moment = require("moment");

const device = sequelize.define(
  "device",
  {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    mac: {
      allowNull: false,
      type: Sequelize.STRING(255)
    },
    longtitude: {
      type: Sequelize.DOUBLE,
      defaultValue: 0.0
    },
    latitude: {
      type: Sequelize.DOUBLE,
      defaultValue: 0.0
    },
    app: {
      allowNull: false,
      type: Sequelize.STRING(255)
    },
    os: {
      allowNull: false,
      type: Sequelize.STRING(255)
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      get() {
        return moment(this.getDataValue("createdAt")).format(
          "YYYY-MM-DD HH:mm"
        );
      }
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      get() {
        return moment(this.getDataValue("updatedAt")).format(
          "YYYY-MM-DD HH:mm"
        );
      }
    }
  },
  {
    freezeTableName: true
  }
);

module.exports = device;

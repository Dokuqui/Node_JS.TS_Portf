const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Location extends Model {
    static associate(models) {
      Location.belongsTo(models.Client, { foreignKey: "clientId" });
      Location.belongsTo(models.Jewelry, { foreignKey: "jewelryId" });
    }
  }

  Location.init(
    {
      idContract: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      dateStartRental: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      dateEndRental: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Clients",
          key: "id",
        },
      },
      jewelryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Jewelry",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Location",
    }
  );
  return Location;
};

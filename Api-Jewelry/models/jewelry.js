const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Jewelry extends Model {
    static associate(models) {
      Jewelry.belongsTo(models.Category, { foreignKey: "categoryId" });
      Jewelry.hasMany(models.Location, { foreignKey: "jewelryId" });
    }
  }

  Jewelry.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      priceSale: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      priceLocation: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Jewelry",
    }
  );
  return Jewelry;
};

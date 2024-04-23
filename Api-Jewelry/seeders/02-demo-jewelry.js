"use strict";

const faker = require("faker");
faker.locale = "fr";

module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = await queryInterface.sequelize.query(
      `SELECT id FROM Categories;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    if (!categories.length) {
      throw new Error("Aucun categories trouvé pour associer des bijou");
    }

    const categoryIds = categories.map((category) => category.id);

    const fakeJewelry = [];

    for (let i = 0; i < 30; i++) {
      const description = faker.commerce.productMaterial();
      const priceSale = faker.commerce.price();
      const priceLocation = faker.commerce.price();
      const categoryId =
        categoryIds[Math.floor(Math.random() * categoryIds.length)];

      fakeJewelry.push({
        description: description,
        priceSale: priceSale,
        priceLocation: priceLocation,
        categoryId: categoryId,
        createdAt: faker.date.between("2015-01-01", "2019-03-14"),
        updatedAt: faker.date.between("2020-01-01", "2024-03-14"),
      });
    }

    await queryInterface.bulkInsert("Jewelry", fakeJewelry);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Jewelry", null, {});
  },
};

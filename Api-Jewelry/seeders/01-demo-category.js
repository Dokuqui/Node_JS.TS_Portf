"use strict";

const faker = require("faker");
const bcrypt = require("bcrypt");
faker.locale = "fr";

module.exports = {
  async up(queryInterface, Sequelize) {
    const fakeCategories = [];

    for (let i = 0; i < 30; i++) {
      const name = faker.commerce.productMaterial();

      fakeCategories.push({
        name: name,
        createdAt: faker.date.between("2015-01-01", "2019-03-14"),
        updatedAt: faker.date.between("2020-01-01", "2024-03-14"),
      });
    }

    await queryInterface.bulkInsert("Categories", fakeCategories);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};

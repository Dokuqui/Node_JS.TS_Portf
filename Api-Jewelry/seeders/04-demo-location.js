"use strict";

const faker = require("faker");
const bcrypt = require("bcrypt");
faker.locale = "fr";

module.exports = {
  async up(queryInterface, Sequelize) {
    const clients = await queryInterface.sequelize.query(
      `SELECT id FROM Clients;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    if (!clients.length) {
      throw new Error("Aucun utilisateur trouvé pour associer des location");
    }

    const clientIds = clients.map((client) => client.id);

    const jewelrys = await queryInterface.sequelize.query(
      `SELECT id FROM Jewelry;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    if (!jewelrys.length) {
      throw new Error("Aucun bijou trouvé pour associer des location");
    }

    const jewelryIds = jewelrys.map((jewelry) => jewelry.id);

    const fakeLocations = [];

    for (let i = 0; i < 30; i++) {
      const dateStartRental = faker.date.recent(100);
      const dateEndRental = faker.date.future(100);
      const clientId = clientIds[Math.floor(Math.random() * clientIds.length)];
      const jewelryId =
        jewelryIds[Math.floor(Math.random() * jewelryIds.length)];

      fakeLocations.push({
        dateStartRental: dateStartRental,
        dateEndRental: dateEndRental,
        clientId: clientId,
        jewelryId: jewelryId,
        createdAt: faker.date.between("2015-01-01", "2019-03-14"),
        updatedAt: faker.date.between("2020-01-01", "2024-03-14"),
      });
    }

    await queryInterface.bulkInsert("Locations", fakeLocations);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Locations", null, {});
  },
};

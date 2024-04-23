"use strict";

const faker = require("faker");
const bcrypt = require("bcrypt");
faker.locale = "fr";

module.exports = {
  async up(queryInterface, Sequelize) {
    const fakeClient = [];

    for (let i = 0; i < 30; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const addressStreet = faker.address.streetAddress();
      const postalCode = faker.address.zipCode();
      const city = faker.address.city();
      const email = faker.internet.email(firstName, lastName);
      const faxPhone = faker.datatype.number(999999999).toString();
      const phoneNumber = faker.phone.phoneNumberFormat().replace(/-/g, "");

      fakeClient.push({
        firstName: firstName,
        lastName: lastName,
        addressStreet: addressStreet,
        postalCode: postalCode,
        city: city,
        email: email,
        faxPhone: faxPhone,
        phoneNumber: phoneNumber,
        createdAt: faker.date.between("2015-01-01", "2019-03-14"),
        updatedAt: faker.date.between("2020-01-01", "2024-03-14"),
      });
    }

    await queryInterface.bulkInsert("Clients", fakeClient);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Clients", null, {});
  },
};

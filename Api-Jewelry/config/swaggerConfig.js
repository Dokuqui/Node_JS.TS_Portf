const jewelrySwagger = require("../swagger/jewelry.swagger");
const locationSwagger = require("../swagger/location.swagger");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Forum",
      version: "1.0.0",
      description: "API du Bijou avec Node.js et Express",
    },
    servers: [
      {
        url: "https://s3-5193.nuage-peda.fr/",
        description: "Serveur de Développement",
      },
    ],
    components: {
      schemas: {
        ...jewelrySwagger.components.schemas,
        ...locationSwagger.components.schemas,
      },
    },
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerOptions;

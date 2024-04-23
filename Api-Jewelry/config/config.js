const config = {
  development: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: "dbBijouterie",
    host: "127.0.0.1",
    dialect: "mariadb",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

const configJSON = JSON.stringify(config, null, 2);

const { Umzug, SequelizeStorage } = require('umzug'); // como está

const sequelize = require('../../src/db/sequelize');

const umzug = new Umzug({
  migrations: { glob: './src/db/seeders/*.js' }, // donde va a encontrar migraciones o seeds de datos
  context: sequelize.getQueryInterface(), // el contexto
  storage: new SequelizeStorage({ sequelize }),
  logger: undefined,
});

const upSeed = async () => {
  try {
    await sequelize.sync({ force: true });
    await umzug.up();

  } catch (error) {
    console.error(`Error while seeding the database: ${error}`);
  }
};

const downSeed = async () => {
  await sequelize.drop();
};

module.exports = { upSeed, downSeed };

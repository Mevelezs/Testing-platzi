const sequelize = require('../../src/db/sequelize');
const bcrypt = require('bcrypt');

const { models } = sequelize;

const upSeed = async () => {
  try {
    await sequelize.sync({ force: true });
    const password = 'admin123';
    const hash = await bcrypt.hash(password, 10);
    const user = { email: 'mail@mail.com', password: hash, role: 'admin' };
    await models.User.create(user);

    await models.Category.bulkCreate([
      {
        name: 'Electronics',
        image: '"https://api.lorem.space/image/game?w=150&h=220"',
      },
      {
        name: 'Cosmetic',
        image: '"https://api.lorem.space/image/game?w=150&h=220"',
      },
    ]);
  } catch (error) {
    console.error(`Error while seeding the database: ${error}`);
  }

};

const downSeed = async () => {
  await sequelize.drop();
};

module.exports = { upSeed, downSeed };

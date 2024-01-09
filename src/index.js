const port = process.env.PORT || 3000;
const createApp = require('./app');

const app = createApp();

app.listen(port, () => {
  console.log(`Mi port ${port}`);
});

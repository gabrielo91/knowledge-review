const app = require('./app');
const PORT = process.env.PORT || 8080;

const start = () => {
  app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
  });
};

start();

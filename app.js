require('dotenv').config();
const express = require('express');
const cors = require('cors');

const router = require('./src/routes');
const errorHandler = require('./src/middlewares/errorHandler');
const initializeModel = require('./src/services/initializeModel');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(
    '<h1>Final Project Belajar Penerapan Machine Learning dengan Google Cloud</h1>'
  );
});

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(router);

app.use(errorHandler);

initializeModel(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

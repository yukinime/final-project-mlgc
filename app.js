require('dotenv').config();
const express = require('express');
const cors = require('cors');

const router = require('./src/routes');
const errorHandler = require('./src/middlewares/errorHandler');
const initializeModel = require('./src/configs/initializeModel');
const corsOptions = require('./src/configs/corsOptions');

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('<h1>Skin Cancer Prediction API is running!</h1>');
});

app.use(cors(corsOptions));

app.use(express.json());
app.use(router);

app.use(errorHandler);

initializeModel(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

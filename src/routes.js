const express = require('express');
const multer = require('multer');

const dataController = require('./controllers/dataController');
const predictionController = require('./controllers/predictController');
const generateByteSize = require('./utils/generateByteSize');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: generateByteSize(1),
  },
});

router.get('/predict/histories', dataController.getPredictionHistories);
router.get('/predict', predictionController.index);
router.post('/predict', upload.single('image'), predictionController.predict);

module.exports = router;

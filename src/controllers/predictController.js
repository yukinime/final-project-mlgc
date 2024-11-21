const dataService = require('../services/dataService');
const predictionService = require('../services/predictionService');

const index = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'view index',
      data: "you're viewing predict index",
    });
  } catch (error) {
    next(error);
  }
};

const predict = async (req, res, next) => {
  try {
    const image = req.file;
    const model = req.app.locals.model;

    console.log({ image });

    if (!model) {
      throw new Error('Model failed to load!');
    }

    if (!image) {
      throw new Error('Please insert image!');
    }

    const { result, suggestion } = await predictionService.predict(
      model,
      image.buffer
    );

    const { id, createdAt } = await dataService.createPrediction(
      result,
      suggestion
    );

    return res.status(201).json({
      status: 'success',
      message: 'Model is predicted successfully',
      data: {
        id,
        result,
        suggestion,
        createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { index, predict };

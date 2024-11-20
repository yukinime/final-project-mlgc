const dataService = require('../services/dataService');

const getPredictionHistories = async (req, res) => {
  try {
    const history = await dataService.getAllPrediction();

    res.status(200).json({
      status: 'success',
      data: history,
    });
  } catch (error) {
    console.error('Error :', error.message);

    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      status: 'failed',
      message: 'view index',
      error: error.message,
    });
  }
};

module.exports = { getPredictionHistories };

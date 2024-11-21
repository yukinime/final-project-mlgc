const tf = require('@tensorflow/tfjs-node');

const initializeModel = async (app) => {
  const model = await tf.loadGraphModel(process.env.MODEL_URL);
  app.locals.model = model;

  console.log('Model load success!');
};

module.exports = initializeModel;

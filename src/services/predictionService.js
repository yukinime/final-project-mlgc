const tf = require('@tensorflow/tfjs-node');

const predict = async (model, image) => {
  const tensor = tf.node
    .decodeJpeg(image)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat();

  const prediction = model.predict(tensor);
  const score = await prediction.data();
  const { result, suggestion } =
    score > 0.8
      ? { result: 'Cancer', suggestion: 'Segera periksa ke dokter!' }
      : {
          result: 'Non-cancer',
          suggestion: 'Penyakit kanker tidak terdeteksi.',
        };

  return { result, suggestion };
};

module.exports = { predict };

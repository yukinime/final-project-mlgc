const { Firestore } = require('@google-cloud/firestore');
const path = require('path');

const crypto = require('crypto');
const formatDate = require('../utils/formatDateTimezone');

const db = new Firestore({
  keyFilename: path.resolve(__dirname, '../../app-service-account.json'),
});

const predictionCollection = db.collection('prediction');

const createPrediction = async (result, suggestion) => {
  const id = crypto.randomUUID();
  const createdAt = new Date();

  await predictionCollection.doc(id).set({ id, result, suggestion, createdAt });

  return { id, createdAt };
};

const getAllPrediction = async () => {
  const predictionsSnapshot = await predictionCollection.get();

  const predictions = predictionsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      createdAt: formatDate(data.createdAt.toDate()),
    };
  });

  return predictions;
};

module.exports = { createPrediction, getAllPrediction };

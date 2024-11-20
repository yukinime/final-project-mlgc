const { Firestore } = require('@google-cloud/firestore');

const crypto = require('crypto');
const formatDate = require('../utils/formatDateTimezone');

const db = new Firestore();

const predictionCollection = db.collection('predictions');

const createPrediction = async (result, suggestion) => {
  const id = crypto.randomUUID();
  const createdAt = new Date();

  await predictionCollection.doc(id).set({ id, result, suggestion, createdAt });

  return { id, createdAt: formatDate(createdAt) };
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

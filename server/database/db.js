import mongoose from 'mongoose';


const Connection = async () => {
  const URL = `mongodb://localhost:27017/document_editor`;

  try {
    const connection = mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log('Connected!'));

  } catch (error) {
    console.log("Error while connecting with the database", error);
    throw error; // Rethrow the error to handle it at the calling site
  }
};

export default Connection;

const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`\u001b[1;34m MongoDB connection established at...\u001b[0m`);
    console.log(`\u001b[1;35m ${db} \u001b[0m`);
  } catch (err) {
    console.log('Error connecting to MongoDB ...', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

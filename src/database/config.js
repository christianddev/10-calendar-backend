const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const uri = process.env.DB_CNN;
    await mongoose.connect(uri);
    console.log('DB online')
  } catch (error) {
    console.log("error - dbConnection: ", error);
    throw new Error("Error when initializing DB");
  }
};
module.exports = {
  dbConnection
}

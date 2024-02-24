const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://gofood:hc7456947@cluster0.pvlzqwq.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const mongoDB = async () => {
  mongoose.connect(mongoURI);

  mongoose.connection.on("error", (err) => {
    console.error("---", err);
  });

  mongoose.connection.once("open", async () => {
    console.log("Database Connected Successfully....");
    const fetched_data = mongoose.connection.db.collection("food_items");
    
    const cursor = fetched_data.find({});
    
    const items = [];
    
    cursor.forEach(async function(data) {
      items.push(data);

      // Retrieve foodCategory data
      const catData = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

      global.food_items = items;
      global.global.foodCategory = catData;
      // console.log(global.food_items);
      // console.log(global.foodCategory);
    }, function(err) {
      if(err) {
        console.error(err);
      }
    });
  });
};

module.exports = mongoDB;

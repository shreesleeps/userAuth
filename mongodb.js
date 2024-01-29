const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://shreesleeps:y73R1CDoNmOypgxU@login.jxpbwfr.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed to connect");
  });

const LogInSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});




//defining collection

const collection = new mongoose.model("Collection1", LogInSchema)  //which schema it'll follow

module.exports = collection
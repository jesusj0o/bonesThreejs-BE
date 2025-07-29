const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const boneRoutes = require("./routes/bone.routes");

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

//Db connection
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/bones", boneRoutes);

app.listen(port, () => {
  console.log(`Server Running http://localhost:${port}`);
});

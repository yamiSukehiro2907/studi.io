const express = require("express");
const connectMongoDB = require("./config/mongoDB.config.js");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.use("/auth", require("./routers/auth.route.js"));

app.use("/user", require("./routers/user.route.js"));

app.use('/otp' , require('./routers/otp.route.js'))

app.listen(PORT, async () => {
  await connectMongoDB();
  console.log(`Server is running at ${PORT}`);
});

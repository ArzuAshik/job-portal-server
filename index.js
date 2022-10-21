require("colors");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const jobsRoutes = require("./routes/v1/jobs.route.js");
const managerRoutes = require("./routes/v1/manager.route.js");
const adminRoutes = require("./routes/v1/admin.route.js");
const authRoutes = require("./routes/v1/auth.route.js");
const errorHandler = require("./middleware/errorHandler");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

// db connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("DB Connected".yellow.bold)
  }).catch(err => {
    console.log(err)
    console.log("connection Failed!".red.bold);
  });

// listening app
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`.blue);
});


// routes
app.use("/api/v1/jobs", jobsRoutes);
app.use("/api/v1/manager/jobs", managerRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", authRoutes);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public");
});
app.all("*", (req, res) => {
  res.send("No route found.");
});

app.use(errorHandler);

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});

const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');
const userRoute = require('./api/modules/user/user.routes');
const studentRoutes = require('./api/modules/student/student.routes');
require('dotenv/config')

mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connection established...")
);

app.use(cors());
app.use(bodyParser.json());

app.use("/user", userRoute);
app.use("/student", studentRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(`/api/login`, require("../routes/auth"));
app.use(`/api/user`, require("../routes/user"));
app.use(`/api/friend`, require("../routes/friend"));
app.use(`/api/movie`, require("../routes/movie"));
app.use(`/api/category`, require("../routes/category"));
app.use(`/api/sub-category`, require("../routes/sub-category"));

module.exports = app;

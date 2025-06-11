const express = require("express");
const routes = express.Router();
const {localFileUpload} = require("../controllers/fileUpload.js")

routes.route('/upload/file').post(localFileUpload);

module.exports = routes;

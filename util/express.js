const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const validator = require("express-validator");
const ENV = process.env.NODE_ENV || "dev";
const GOOGLE_KEY = process.env.NODE_GOOGLE_KEY || "_YOUR_KEY_";

module.exports = () => {

    let app = express();

    const config = require(`../env/${ENV}`);
    
    app.profile = config;
    app.profile.googleApiKey = GOOGLE_KEY;

    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());
    app.use(validator());

    consign({cwd: "app"})
        .include("repositories")
        .include("services")
        .include("api")
        .into(app);

    return app;
}
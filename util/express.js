module.exports = () => {
    let express = require("express");
    let consign = require("consign");
    let bodyParser = require("body-parser");
    let validator = require("express-validator");
    let app = express();

    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());
    app.use(validator());

    consign({cwd: 'app'})
        .include("repositories")
        .include("services")
        .include("api")
        .into(app);

    return app;
}
class EntityManager {
    constructor(app) {
        
        this._mongoClient = require('mongodb').MongoClient;
        this._database = app.profile.database.name;
        this._host = app.profile.database.host;
        this._port = app.profile.database.port;
        this._url = `mongodb://${this._host}:${this._port}/${this._database}`;

    }

    getConnection() {
        
        return this._mongoClient.connect(this._url)
            .catch(error => {

                console.log(error);
                
                throw {
                    status : 400,
                    message : "Database connection failed."
                };

            });
    }

    getDatabase() {
        return this._database;
    }
}

module.exports = app => app => new EntityManager(app);
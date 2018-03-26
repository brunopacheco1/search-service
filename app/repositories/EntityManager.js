class EntityManager {
    constructor(app) {
        
        this._mongoClient = require('mongodb').MongoClient;
        this._database = "search-service";
        this._url = "mongodb://mongo:27017/" + this._database;

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
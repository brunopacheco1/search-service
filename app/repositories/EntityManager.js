class EntityManager {
    constructor(app) {
        this._connection = {
            host : "localhost",
            user : "root",
            password : "password",
            database : "search-service"
        };
    }

    getConnection() {
        return new Promise((resolve, reject) => {
            resolve(this._connection);
        });
    }
}

module.exports = (app) => (app) => new EntityManager(app);
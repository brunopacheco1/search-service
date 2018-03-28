class SchemaManagementTool {

    constructor(app) {

        this._entityManager = app.repositories.EntityManager(app);

    }

    runSteps() {
        return this.buildLocationIndex().then(this.clean());
    }

    buildLocationIndex() {
        return this._entityManager.getConnection().then(connection => {

            let database = connection.db(this._entityManager.getDatabase());

            let collection = database.collection("machine-shop");

            return collection.createIndex({ location : "2dsphere" } ).then(connection.close());
        });
    }

    clean() {

        return this._entityManager.getConnection().then(connection => {

            let database = connection.db(this._entityManager.getDatabase());

            return database.listCollections().toArray().then(collections => {
                let promises = collections.map(
                    collection => database.collection(collection.name).deleteMany({})
                );

                return Promise.all(promises).then(connection.close());
            });

        });

    }
}

module.exports = app => app => new SchemaManagementTool(app);
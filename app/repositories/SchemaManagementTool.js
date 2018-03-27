class SchemaManagementTool {

    constructor(app) {

        this._entityManager = app.repositories.EntityManager(app);

    }

    clean() {

        return this._entityManager.getConnection().then(connection => {

            console.log("Cleaning the database...");

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
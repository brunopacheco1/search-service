let ObjectId = require('mongodb').ObjectID;

class MachineShopRepository {

    constructor(app) {

        this._entityManager = app.repositories.EntityManager(app);
        this._collectionName = "machine-shop";

    }

    save(machineShop) {

        return this._entityManager.getConnection().then(connection => {

            console.log("Saving... " + machineShop.name);
            
            let database = connection.db(this._entityManager.getDatabase());

            let collection = database.collection(this._collectionName);

            return collection.insertOne(machineShop).then(connection.close());

        });

    }

    get(id) {

        return this._entityManager.getConnection().then(connection => {

            console.log("Querying... " + id);

            let database = connection.db(this._entityManager.getDatabase());

            let collection = database.collection(this._collectionName);

            return collection.findOne({ _id : new ObjectId(id)})
                .then((machineShop) => connection.close().then(() => machineShop));

        });

    }

    list() {

        return this._entityManager.getConnection().then(connection => {

            console.log("Listing...");

            let database = connection.db(this._entityManager.getDatabase());

            let collection = database.collection(this._collectionName);

            return collection.find({}).limit(100).toArray()
                .then((resultList) => connection.close().then(() => resultList));

        });

    }

    update(id, machineShop) {

        return this._entityManager.getConnection().then(connection => {

            console.log("Updating... " + id);

            let database = connection.db(this._entityManager.getDatabase());

            let collection = database.collection(this._collectionName);

            return collection.updateOne({ _id : new ObjectId(id)}, { $set : machineShop })
                .then(connection.close());

        });

    }

    delete(id) {

        return this._entityManager.getConnection().then(connection => {

            console.log("Deleting... " + id);

            let database = connection.db(this._entityManager.getDatabase());

            let collection = database.collection(this._collectionName);

            return collection.deleteOne({ _id : new ObjectId(id)})
                .then(connection.close());

        });
        
    }
}

module.exports = app => app => new MachineShopRepository(app);
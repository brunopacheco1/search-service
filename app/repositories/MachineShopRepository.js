class MachineShopRepository {

    constructor(app) {

        this._entityManager = app.repositories.EntityManager(app);
        this._collectionName = "machine-shop";
        
    }

    save(machineShop) {

        return this._entityManager.getConnection().then(connection => {

            let database = connection.db(this._entityManager.getDatabase());

            let collection = database.collection(this._collectionName);

            return collection.findOne({ _id : machineShop._id})
                .then((machineShopResult) => {

                    if(machineShopResult) {
                        return connection.close().then(() => machineShopResult)
                    }

                    return collection.insertOne(machineShop).then(connection.close()).then(() => machineShop);
                });
        });

    }

    get(id) {

        return this._entityManager.getConnection().then(connection => {

            let database = connection.db(this._entityManager.getDatabase());

            let collection = database.collection(this._collectionName);

            return collection.findOne({ _id : id})
                .then((machineShop) => connection.close().then(() => machineShop));

        });

    }

    list() {

        return this._entityManager.getConnection().then(connection => {

            let database = connection.db(this._entityManager.getDatabase());

            let collection = database.collection(this._collectionName);

            return collection.find({}).limit(100).toArray()
                .then((resultList) => connection.close().then(() => resultList));

        });

    }

    update(id, machineShop) {

        return this._entityManager.getConnection().then(connection => {

            let database = connection.db(this._entityManager.getDatabase());

            let collection = database.collection(this._collectionName);

            return collection.updateOne({ _id : id}, { $set : machineShop })
                .then(connection.close());

        });

    }

    delete(id) {

        return this._entityManager.getConnection().then(connection => {

            let database = connection.db(this._entityManager.getDatabase());

            let collection = database.collection(this._collectionName);

            return collection.deleteOne({ _id : id})
                .then(connection.close());

        });
        
    }

    search(request) {
        return this._entityManager.getConnection().then(connection => {

            let database = connection.db(this._entityManager.getDatabase());

            let collection = database.collection(this._collectionName);

            if(!request.query) {
                request.query = ".*";
            }

            if(!request.limit) {
                request.limit = 100;
            }

            if(!request.start) {
                request.start = 0;
            }
            
            return collection.find({
                name : new RegExp(request.query),
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [request.lng, request.lat]
                        },
                        $maxDistance: request.maxDistance,
                        $minDistance: request.minDistance
                    }
                }
            }).skip(request.start).limit(request.limit).toArray()
                .then((resultList) => connection.close().then(() => resultList));

        });
    }
}

module.exports = app => app => new MachineShopRepository(app);
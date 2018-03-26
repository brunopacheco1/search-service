class MachineShopRepository {

    constructor(app) {
        this._entityManager = app.repositories.EntityManager(app);
    }

    save(machineShop) {
        return this._entityManager.getConnection().then((connection) => {
            console.log("Saving... " + machineShop.name)
        });
    }

    get(id) {
        return this._entityManager.getConnection().then((connection) => {
            return id;
        });
    }
}

module.exports = (app) => (app) => new MachineShopRepository(app);
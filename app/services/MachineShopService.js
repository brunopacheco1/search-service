class MachineShopService {
    constructor(app) {
        this._machineShopRepository = app.repositories.MachineShopRepository(app);
    }

    get(id) {
        return this._machineShopRepository.get(id);
    }

    save(machineShop) {
        return this._machineShopRepository.save(machineShop);
    }
}

module.exports = (app) => (app) => new MachineShopService(app);
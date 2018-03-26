class MachineShopService {
    constructor(app) {
        this._machineShopRepository = app.repositories.MachineShopRepository(app);
    }

    get(id) {
        return this._machineShopRepository.get(id);
    }

    list() {
        return this._machineShopRepository.list();
    }

    save(machineShop) {
        return this._machineShopRepository.save(machineShop);
    }

    update(id, machineShop) {
        return this._machineShopRepository.update(id, machineShop);
    }

    delete(id) {
        return this._machineShopRepository.delete(id);
    }
}

module.exports = app => app => new MachineShopService(app);
class MachineShopService {
    constructor(app) {
        this._googleApiService = app.services.GoogleApiService(app);
        this._machineShopRepository = app.repositories.MachineShopRepository(app);
    }

    get(id) {
        return this._machineShopRepository.get(id);
    }

    search(request) {
        return this._machineShopRepository.search(request);
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

    crawl(query) {
        return this._googleApiService.listMachineShops(query).then(shops => {
            
            let promises = shops.map(shop => {
                this._machineShopRepository.save(shop);
            });

            return Promise.all(promises).then(() => shops);
        });
    }
}

module.exports = app => app => new MachineShopService(app);
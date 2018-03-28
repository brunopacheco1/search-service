class MachineShopService {
    constructor(app) {
        this._googleApiService = app.services.GoogleApiService(app);
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

    crawl(query) {
        return this._crawlShops(query, []);
    }

    _crawlShops(query, previousList) {

        return this._googleApiService.listMachineShops(query).then((response) => {
            let shops = response.results.map(place => {

                return {
                    location : place.geometry.location,
                    name : place.name,
                    _id : place.id,
                    vicinity : place.formatted_address
                };

            });

            previousList = previousList.concat(shops);

            let promises = shops.map(shop => {
                this._machineShopRepository.save(shop);
            });

            return Promise.all(promises).then(() => {
                if(response.nextToken) {
                    console.log("Querying next page.");
                    query.pagetoken = response.nextToken;
                    

                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(this._crawlShops(query, previousList));
                        }, 5000);
                    });
                } else {
                    console.log(`Returning the final result: ${previousList.length}`);
                    return previousList;
                }
            });
        });
    }
}

module.exports = app => app => new MachineShopService(app);
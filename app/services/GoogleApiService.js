const request = require("request");
const GoogleMaps = require('@google/maps');

class GoogleApiService {

    constructor(app) {
        this.googleApiKey = app.profile.googleApiKey;
        
        this.googleMapsClient = GoogleMaps.createClient({
            key: this.googleApiKey,
            Promise: Promise
        });
    }

    listMachineShops(query) {
        return this.googleMapsClient.places(query).asPromise().then(googleResponse => {
            console.log(`Result size: ${googleResponse.json.results.length}`);

            return {
                results : googleResponse.json.results,
                nextToken : googleResponse.json.next_page_token
            };
        }).catch(error => {
            console.log(error);

            return {
                results : []
            };
        });
    }
}

module.exports = app => app => new GoogleApiService(app);
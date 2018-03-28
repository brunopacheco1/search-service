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

    listMachineShops(query, previousList) {
        return this.googleMapsClient.places(query).asPromise().then(googleResponse => {
            
            const response = googleResponse.json;

            console.log(`Result size: ${response.results.length}`);

            let shops = response.results.map(place => {
                const location = place.geometry.location;

                return {
                    location : { type: "Point", coordinates: [ location.lng, location.lat ] },
                    name : place.name,
                    _id : place.id,
                    vicinity : place.formatted_address
                };

            });

            if(!previousList) {
                previousList = [];
            }

            previousList = previousList.concat(shops);

            if(response.next_page_token) {
                
                query.pagetoken = response.next_page_token;
                
                return new Promise((resolve, reject) => {
                    //For some reason it is not working querying nextPage without timeout.
                    setTimeout(() => {
                        resolve(this.listMachineShops(query, previousList));
                    }, 5000);
                });

            } else {
                console.log(`Returning the final result: ${previousList.length}`);
                return previousList;
            }

        }).catch(error => {
            console.log(error);

            return [];
        });
    }
}

module.exports = app => app => new GoogleApiService(app);
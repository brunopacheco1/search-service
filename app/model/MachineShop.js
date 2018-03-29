module.exports = {
    name: {
        isLength: {
            errorMessage: "name is a mandatory field",
            options: { min: 1 }
        }
    },
    _id: {
        isLength: {
            errorMessage: "_id is a mandatory field",
            options: { min: 1 }
        }
    },
    vicinity: {
        isLength: {
            errorMessage: "vicinity is a mandatory field",
            options: { min: 1 }
        }
    },
    location: {
        errorMessage: "location is a mandatory field and it should be latLng format",
        custom: {
            options: (value, { req, location, path }) => {
                
                let validated = false;

                if(value) {
                    validated = true;
                }

                return validated;
            }
        },
        customSanitizer: {
            options: (value, { req, location, path }) => {

                let sanitizedValue = null;

                if (req.body.location && location && path) {
                    let parts = value.split(",");

                    let lat = parseFloat(parts[0]);
                    let lng = parseFloat(parts[1]);

                    if(!isNaN(lat) && !isNaN(lng)) {
                        sanitizedValue =  { type: "Point", coordinates: [ lng, lat ] };
                    }
                }

                return sanitizedValue;
            }
        },
    }
};
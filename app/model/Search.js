module.exports = {
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
    },
    maxDistance: {
        errorMessage: "maxDistance is a mandatory field and it should be int",
        isInt: true,
        toInt: true
    },
    minDistance: {
        errorMessage: "minDistance is a mandatory field and it should be int",
        isInt: true,
        toInt: true
    },
    limit: {
        optional: true,
        errorMessage: "limit should be int",
        isInt: true,
        toInt: true
    },
    start: {
        optional: true,
        errorMessage: "start should be int",
        isInt: true,
        toInt: true
    },
    query: {
        optional: true,
        isLength: {
            errorMessage: "Query should be at least 3 chars long",
            options: { min: 3 }
        }
    }
};
module.exports = {
    location: {
        errorMessage: "location is a mandatory field and it should be latLng format",
        isLatLong : true
    },
    radius: {
        errorMessage: "radius is a mandatory field and it should be int",
        isInt: true,
        toInt: true
    }
};
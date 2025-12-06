const request = require("postman-request");

const geocode = (address, callback) => {
  // GANTI DENGAN API KEY MAPBOX ANDA
  const accessToken =
    "pk.eyJ1IjoiZmF6YTAzOCIsImEiOiJjbWg2Y242ZWowaHBhMmtvZTIxNjNzam5oIn0.5fORGcDa-HiRK0MV9GUrrQ";
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${accessToken}&limit=1`;

  console.log("Geocode URL:", url); // DEBUG

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Tidak dapat terkoneksi ke layanan geocoding", undefined);
    } else if (body.features && body.features.length === 0) {
      callback("Tidak dapat menemukan lokasi. Coba lokasi lain", undefined);
    } else if (body.message) {
      callback("Error API: " + body.message, undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

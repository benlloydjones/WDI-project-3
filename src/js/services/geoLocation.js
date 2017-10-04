angular
  .module('pubMeetApp')
  .service('geoLocation', geoLocation);

geoLocation.inject = ['$q'];
function geoLocation($q) {
  let location = null;

  function getCurrentLocation() {
    return $q((resolve, reject) => {
      if(location) return resolve(location);
      if(!navigator.geolocation) reject(new Error('No location service available'));
      navigator.geolocation.getCurrentPosition((position, err) => {
        if(err) return reject(err);
        location = { lat: position.coords.latitude, lng: position.coords.longitude };
        return resolve(location);
      });
    });
  }

  this.getCurrentLocation = getCurrentLocation;
}

angular
  .module('pubMeetApp')
  .service('googlePlaces', googlePlaces);

googlePlaces.$inject = ['$window', '$q'];
function googlePlaces($window, $q) {
  let service = null;
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function padNum(num) {
    if(num < 10) return '0'+num;
    return num.toString();
  }

  function modifyPlace(place) {
    if(place.photos) {
      place.photo = place.photos[0].getUrl({ maxWidth: 400, maxHeight: 400 });
      delete place.photos;
    }

    if(place.opening_hours && place.opening_hours.periods) place.opening_hours = place.opening_hours.periods.map(period => {
      const openingTime = `${days[period.open.day]} ${padNum(period.open.hours)}:${padNum(period.open.minutes)}`;
      const closingTime = `${days[period.close.day]} ${padNum(period.close.hours)}:${padNum(period.close.minutes)}`;
      return `${openingTime} - ${closingTime}`;
    });

    return place;
  }

  return function(map) {
    service = new $window.google.maps.places.PlacesService(map);

    return {
      search(params) {
        return $q((resolve, reject) => {
          service.nearbySearch(params, (results, status) => {
            if(status !== 'OK') return reject(new Error(status));
            results = results.map(modifyPlace);
            return resolve(results);
          });
        });
      },
      details(params) {
        return $q((resolve, reject) => {
          service.getDetails(params, (result, status) => {
            if(status !== 'OK') return reject(new Error(status));
            result = modifyPlace(result);
            return resolve(result);
          });
        });
      }
    };
  };
}

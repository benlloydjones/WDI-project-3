angular
  .module('pubMeetApp')
  .service('googlePlaces', GooglePlaces);

GooglePlaces.$inject = ['$http', 'API'];
function GooglePlaces($http, API) {

  function getBars(lat, lng, bar) {
    return $http
      .get(`${API}/events`, { params: { lat, lng, bar } })
      .then((response) => {
        return response.data.results;
      });
  }

  this.getBars = getBars;
}

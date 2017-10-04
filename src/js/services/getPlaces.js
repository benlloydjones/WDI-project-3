angular
  .module('pubMeetApp')
  .service('getPlaces', GetPlaces);

GetPlaces.$inject = ['$http'];
function GetPlaces($http) {
  function getBars(lat, lng, radius, type) {
    return $http
      .get('/api/googlePlaces', { params: { lat, lng, radius, type }})
      .then(response => response.data.results);
  }

  this.getBars = getBars;
}

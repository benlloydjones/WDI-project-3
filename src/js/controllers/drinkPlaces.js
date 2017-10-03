/* global google:ignore */

angular
  .module('pubMeetApp')
  .controller('DrinkPlaceIndexCtrl', DrinkPlaceIndexCtrl);

DrinkPlaceIndexCtrl.$inject = ['filterFilter', '$scope'];
function DrinkPlaceIndexCtrl(filterFilter, $scope) {
  const vm = this;

  // setting initial lat and lng for the map
  const latLng = new google.maps.LatLng(51.5,-0.12);

  // creating a new google map
  const map = new google.maps.Map(document.getElementById('map'), {
    center: latLng,
    zoom: 12
  });

  // creating a places service to be used later
  const service = new google.maps.places.PlacesService(map);

  function getPubs() {
    // creating an object of configuration options
    const request = {
      location: latLng,
      radius: 10000,
      type: ['bar'],
      keyword: vm.q
    };
    service.nearbySearch(request, displayResults);
  }

  function displayResults(results) {
    // instead of console logging, attach results to vm
    vm.results = results.map(place => {
      if(place.photos) place.photo = place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 });
      return place;
    });

    $scope.$apply();
  }

  vm.getPubs = getPubs;
}

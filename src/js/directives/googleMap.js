/*global google*/
angular
  .module('pubMeetApp')
  .directive('googleMap', googleMap);

googleMap.$inject = ['googlePlaces'];
function googleMap(googlePlaces) {
  return {
    restrict: 'E',
    template: '<div class="map"></div>',
    replace: true,
    scope: {
      center: '=',
      search: '=?',
      details: '=?',
      result: '='
    },
    link($scope, $element) {
      const map = new google.maps.Map($element[0], {
        center: { lat: 51.5327549, lng: -0.090972 },
        zoom: 14
      });
      const infowindow = new google.maps.InfoWindow();
      const placeMarker = new google.maps.Marker({ map });
      let markers = [];

      const service = googlePlaces(map);

      const marker = new google.maps.Marker({
        map: map
      });

      $scope.$watch('center', () => {
        if(!$scope.center) return false;
        map.setCenter($scope.center);
        if(marker) marker.setPosition($scope.center);
      });

      $scope.$watch('search', () => {
        if(!$scope.search) return false;
        service.search($scope.search)
          .then(places => {
            $scope.result = places;
            markers.forEach(marker => marker.setMap(null));

            markers = places.map(place => {
              const marker = new google.maps.Marker({
                position: place.geometry.location,
                map: map
              });
              marker.addListener('click', () => showInfoWindow(marker, place));

              return marker;
            });
          });
      }, true);

      function showInfoWindow(marker, place) {
        infowindow.close();
        infowindow.setContent(`<div class="infowindow">
          <a href="places/${place.place_id}"><h3 class="info">${place.name}</h3></a>
        </div>`);
        infowindow.open(map, marker);
      }

      if($scope.details) {
        $scope.$watch('details', () => {
          service.details($scope.details)
            .then(place => {
              $scope.result = place;
              map.setCenter(place.geometry.location);
              // adding a marker
              placeMarker.setPosition(place.geometry.location);
            });
        });
      }
    }
  };
}

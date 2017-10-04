/*global google*/
angular
  .module('pubMeetApp')
  .directive('googleMap', googleMap);

function googleMap() {
  return {
    restrict: 'E',
    template: '<div class="map"></div>',
    replace: true,
    scope: {
      center: '=',
      bars: '='
    },
    link($scope, $element) {
      let infowindow = null;

      const map = new google.maps.Map($element[0], {
        center: { lat: 51.5327549, lng: -0.090972 },
        zoom: 14
      });

      const marker = new google.maps.Marker({
        map: map
      });

      $scope.$watch('center', () => {
        if(!$scope.center) return false;
        map.setCenter($scope.center);
        if(marker) {
          marker.setPosition($scope.center);
        }
      });

      $scope.$watch('bars', () => {
        $scope.bars.forEach(bar => {
          const marker = new google.maps.Marker({
            position: { lat: bar.geometry.location.lat, lng: bar.geometry.location.lng } ,
            map: map
          });
          marker.addListener('click', () => {
            createInfoWindow(marker, bar);
          });
        });
      });

      function createInfoWindow(marker, bar) {
        if(infowindow) infowindow.close();
        infowindow = new google.maps.InfoWindow({
          content: `<div class="infowindow">
              <a ui-sref="placesShow({ googlePlacesId: ${bar.place_id} })"><h3 class="info">${bar.name}</h3></a>
              <p>${bar.place_id}</p>
            </div>`
        });
        infowindow.open(map, marker);
      }
    }
  };
}

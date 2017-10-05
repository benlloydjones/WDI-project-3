/* global google:ignore */

angular
  .module('pubMeetApp')
  .controller('PlacesIndexCtrl', PlacesIndexCtrl)
  .controller('PlacesShowCtrl', PlacesShowCtrl);

PlacesIndexCtrl.$inject = ['filterFilter', '$scope'];
function PlacesIndexCtrl(filterFilter, $scope) {
  const vm = this;
  vm.type = 'bar';
  let markers = [];

  function removeMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
  }

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
      type: [vm.type],
      keyword: vm.q
    };

    service.nearbySearch(request, displayResults);
  }

  function displayResults(results) {

    removeMarkers();

    vm.results = results.map(place => {
      if(place.photos) place.photo = place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 });
      return place;
    });

    let infowindow = null;

    // const marker = new google.maps.Marker({
    //   map: map
    // });

    vm.results.forEach(result => {
      const marker = new google.maps.Marker({
        position: result.geometry.location.toJSON(),
        map: map
      });
      marker.addListener('click', () => {
        createInfoWindow(marker, result);
      });

      markers.push(marker);
    });
    function createInfoWindow(marker, result) {
      if(infowindow) infowindow.close();
      infowindow = new google.maps.InfoWindow({
        content: `<div class="infowindow">
            <a href="/places/${result.place_id}"><h3 class="info">${result.name}</h3></a>
          </div>`
      });
      infowindow.open(map, marker);
    }


    $scope.$apply();
  }

  vm.getPubs = getPubs;
}

// Place.query()
// Place.get()

PlacesShowCtrl.$inject = ['$state', '$scope', 'Comment', 'User', '$auth'];
function PlacesShowCtrl($state, $scope, Comment, User, $auth) {
  const vm     = this;
  vm.place = {};
  vm.newComment = {
    googlePlacesId: $state.params.googlePlacesId
  };
  const { userId } = $auth.getPayload();

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function padNum(num) {
    if(num < 10) return '0'+num;
    return num.toString();
  }

  vm.comments = Comment.query({ googlePlacesId: $state.params.googlePlacesId });

  // creating map for show page
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 51, lng: 0.12 },
    zoom: 12
  });

  // grabbing google places id from the URL and constructing a request object to be used later
  const request = {
    placeId: $state.params.googlePlacesId
  };

  // creating a new places service
  const service = new google.maps.places.PlacesService(map);
  // passing in the request object from above, and defining a callback to run when the request is complete
  service.getDetails(request, centerMap);

  // the callback gets two args, the place details, and the status code by default
  function centerMap(place, status) {
    console.log('Place info from Google', place);
    // if the request was successful
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // attaching the place details from google places to the controller so that it's available in the view
      if(place.photos) place.photo = place.photos[0].getUrl({ maxWidth: 400, maxHeight: 400 });
      if(place.opening_hours) place.opening_hours = place.opening_hours.periods.map(period => {
        const openingTime = `${days[period.open.day]} ${padNum(period.open.hours)}:${padNum(period.open.minutes)}`;
        const closingTime = `${days[period.close.day]} ${padNum(period.close.hours)}:${padNum(period.close.minutes)}`;
        return `${openingTime} - ${closingTime}`;
      });
      console.log(place.opening_hours);
      vm.place = place;

      // saving the place lat and lng in an object called latLng
      const latLng = place.geometry.location.toJSON();
      // re-centering the map on the place latLng
      map.setCenter(latLng);
      // adding a marker
      new google.maps.Marker({
        map: map,
        position: latLng
      });

      // forcing Angular to update the DOM to show the vm.place details
      $scope.$apply();
    }
  }
  function commentsCreate() {
    console.log('form submitted');
    User
      .get({ id: userId })
      .$promise
      .then(user => {
        vm.newComment.user = user.id;
        vm.currentUser = user;
      })
      .then(() => {
        console.log(vm.newComment);
        Comment
          .save(vm.newComment)
          .$promise
          .then(() => {
            vm.newComment.user = vm.currentUser;
            vm.comments.push(vm.newComment);
            vm.newComment = {
              googlePlacesId: $state.params.googlePlacesId
            };
          });
      })
      .catch(err => console.log(err));
  }
  vm.commentsCreate = commentsCreate;

  // function ratingAverage() {
  //   Comment
  //
  // }
}

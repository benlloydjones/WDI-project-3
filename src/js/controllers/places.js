/* global google:ignore */

angular
  .module('pubMeetApp')
  .controller('PlacesIndexCtrl', PlacesIndexCtrl)
  .controller('PlacesShowCtrl', PlacesShowCtrl);

PlacesIndexCtrl.$inject = ['filterFilter', '$scope'];
function PlacesIndexCtrl(filterFilter, $scope) {
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
    vm.results = results.map(place => {
      if(place.photos) place.photo = place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 });
      return place;
    });

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

  vm.comments = null;

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
      vm.place = place;
      Comment
        .query({ googlePlacesId: $state.params.googlePlacesId })
        .$promise
        .then((comments => {
          vm.comments = comments;
          let totalRating = 0;
          vm.comments.forEach(comment => totalRating += comment.rating);
          vm.avgRating = (vm.comments.length > 0 ? totalRating / vm.comments.length : vm.place.rating);
        }));

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
}

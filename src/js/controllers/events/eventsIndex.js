angular
  .module('pubMeetApp')
  .controller('EventsIndexCtrl', EventsIndexCtrl);

EventsIndexCtrl.$inject = ['User', '$auth', 'meetUp'];
function EventsIndexCtrl(User, $auth, meetUp) {
  const vm = this;
  vm.radius = 5;

  getCurrentUser();

  function getEvents(access_token, lat, lon, radius) {
    meetUp.getEvents(access_token, lat, lon, radius)
      .then(response => vm.all = response);
  }

  //returns the current user to vm.currentUser
  function getCurrentUser() {
    const { userId } = $auth.getPayload();
    if(userId) {
      User
        .get( { id: userId })
        .$promise
        .then( currentUser => {
          vm.currentUser = currentUser;
        })
        .then(() => {
          if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              getEvents(vm.currentUser.accessToken, position.coords.latitude, position.coords.longitude, vm.radius);
              vm.lat = position.coords.latitude;
              vm.lng = position.coords.longitude;
            });
          } else {
            getEvents(vm.currentUser.accessToken, 0, 0, vm.radius);
          }
        });
    }
  }

}

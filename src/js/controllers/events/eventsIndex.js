angular
  .module('pubMeetApp')
  .controller('EventsIndexCtrl', EventsIndexCtrl);

EventsIndexCtrl.$inject = ['User', '$auth', 'meetUp', 'geoLocation'];
function EventsIndexCtrl(User, $auth, meetUp, geoLocation) {
  const vm = this;
  vm.radius = 5;

  getCurrentUser();

  function getEvents(accessToken, lat, lon, radius) {
    meetUp.getEvents(accessToken, lat, lon, radius)
      .then(response => {
        const events = response;
        vm.all = events.filter(event => event.visibility === 'public');
      });
  }

  //returns the current user to vm.currentUser
  function getCurrentUser() {
    const { userId } = $auth.getPayload();
    if(userId) {
      User
        .get({ id: userId })
        .$promise
        .then(currentUser => vm.currentUser = currentUser)
        .then(() => geoLocation.getCurrentLocation())
        .then(location => getEvents(vm.currentUser.accessToken, location.lat, location.lng, vm.radius))
        .catch(() => getEvents(vm.currentUser.accessToken, 0, 0, vm.radius));
    }
  }

}

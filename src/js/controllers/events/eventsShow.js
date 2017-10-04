angular
  .module('pubMeetApp')
  .controller('EventsShowCtrl', EventsShowCtrl);

EventsShowCtrl.$inject = ['meetUp', '$state', 'User', 'getPlaces', '$scope'];
function EventsShowCtrl(meetUp, $state, User, getPlaces, $scope) {
  const vm = this;
  vm.event = null;
  vm.eventRSVP = null;
  vm.members = [];
  vm.eventRSVP = null;
  vm.meetUpIds = [];


  getEvent($state.params.group, $state.params.id);
  getEventRSVP($state.params.group, $state.params.id);


  function getEvent(group, eventId) {
    meetUp.getEvent(group, eventId)
      .then(response => {
        vm.event = response;
        vm.center = { lat: vm.event.venue.lat, lng: vm.event.venue.lon };
        getBars(vm.center.lat, vm.center.lng, 1000, 'bar');
      });
  }

  function getBars(lat, lng, radius, type) {
    getPlaces.getBars(lat, lng, radius, type)
      .then(response => {
        vm.places = response;
      });
  }

  function getEventRSVP(group, eventId) {
    meetUp.getEventRSVP(group, eventId)
      .then(response => {
        vm.eventRSVP = response;
        response.forEach(member => vm.meetUpIds.push(member.member.id));
      })
      .then(() => {
        User
          .query()
          .$promise
          .then(users => {
            vm.members = users.filter(user => vm.meetUpIds.includes(user.meetUpId));
            vm.membersMeetUpIds = vm.members.map(member => member.meetUpId);
            console.log(vm.membersMeetUpIds);
          });
      });
  }

  function displayResults(results) {
    vm.results = results.map(place => {
      if(place.photos) place.photo = place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 });
      return place;
    });

    $scope.$apply();
  }

  vm.displayResults = displayResults;
}

angular
  .module('pubMeetApp')
  .controller('EventsShowCtrl', EventsShowCtrl);

EventsShowCtrl.$inject = ['meetUp', '$state', 'User'];
function EventsShowCtrl(meetUp, $state, User) {
  const vm = this;
  vm.event = null;
  vm.eventRSVP = null;
  vm.members = [];
  vm.eventRSVP = null;
  vm.meetupIds = [];

  getEvent($state.params.group, $state.params.id);
  getEventRSVP($state.params.group, $state.params.id);


  function getEvent(group, eventId) {
    meetUp.getEvent(group, eventId)
      .then(response => vm.event = response);
  }

  function getEventRSVP(group, eventId) {
    meetUp.getEventRSVP(group, eventId)
      .then(response => {
        vm.eventRSVP = response;
        response.forEach(member => vm.meetUpsIds.push(member.member.id));
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

}

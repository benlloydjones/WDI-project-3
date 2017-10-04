angular
  .module('pubMeetApp')
  .controller('EventsShowCtrl', EventsShowCtrl);

EventsShowCtrl.$inject = ['meetUp', '$state'];
function EventsShowCtrl(meetUp, $state) {
  const vm = this;
  vm.event = null;

  getEvent($state.params.group, $state.params.id);
  getEventRSVP($state.params.group, $state.params.id);


  function getEvent(group, eventId) {
    meetUp.getEvent(group, eventId)
      .then(response => vm.event = response);
  }

  function getEventRSVP(group, eventId) {
    meetUp.getEventRSVP(group, eventId)
      .then(response => console.log(response));
  }


}

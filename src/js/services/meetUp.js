angular
  .module('pubMeetApp')
  .service('meetUp', MeetUp);

MeetUpIndex.$inject = ['$http'];
function MeetUp($http) {
  function getEvents(access_token, lat, lon, radius) {
    return $http
      .get('http://localhost:4000/api/eventsIndex', { params: { access_token, lat, lon, radius }})
      .then(response => response.data);
  }
  function getEvent(group, eventId) {
    return $http
      .get('http://localhost:4000/api/eventsShow', { params: { group, eventId }})
      .then(response => response.data);
  }
  function getEventRSVP(group, eventId) {
    return $http
      .get('http://localhost:4000/api/eventsShow/rsvps', { params: { group, eventId }})
      .then(response => response);
  }

  this.getEvents = getEvents;
  this.getEvent = getEvent;
  this.getEventRSVP = getEventRSVP;
}

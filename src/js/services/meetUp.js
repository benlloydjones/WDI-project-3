angular
  .module('pubMeetApp')
  .service('meetUp', MeetUp);

MeetUp.$inject = ['$http'];
function MeetUp($http) {
  function getEvents(accessToken, lat, lon, radius) {
    return $http
      .get('/api/eventsIndex', { params: { access_token: accessToken, lat, lon, radius }})
      .then(response => response.data);
  }
  function getEvent(group, eventId) {
    return $http
      .get('/api/eventsShow', { params: { group, eventId }})
      .then(response => response.data);
  }
  function getEventRSVP(group, eventId) {
    return $http
      .get('/api/eventsShow/rsvps', { params: { group, eventId }})
      .then(response => response.data);
  }
  function getUsersEvents(accessToken) {
    return $http
      .get('/api/usersEvents', { params: { access_token: accessToken }})
      .then(response => response.data);
  }

  this.getEvents = getEvents;
  this.getEvent = getEvent;
  this.getEventRSVP = getEventRSVP;
  this.getUsersEvents = getUsersEvents;
}

angular
  .module('pubMeetApp')
  .config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider){
  const clientId = window.location.origin.match('localhost') ? '4mhengo99ojp89iv96v6pqejjj' : 'uhe3ee1ib14b0unoac3biiurig';
  
  $authProvider.oauth2({
    name: 'meetup',
    url: '/api/oauth/meetup',
    clientId: clientId,
    redirectUri: window.location.origin,
    authorizationEndpoint: 'https://secure.meetup.com/oauth2/authorize'
  });
}

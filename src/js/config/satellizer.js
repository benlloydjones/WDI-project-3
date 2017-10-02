angular
  .module('pubMeetApp')
  .config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider){
  $authProvider.oauth2({
    name: 'meetup',
    url: '/api/oauth/meetup',
    clientId: '4mhengo99ojp89iv96v6pqejjj',
    redirectUri: 'http://localhost:7000',
    authorizationEndpoint: 'https://secure.meetup.com/oauth2/authorize'
  });
}

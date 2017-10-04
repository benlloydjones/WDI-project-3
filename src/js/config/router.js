angular
  .module('pubMeetApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('login', {
      url: '/',
      templateUrl: '/js/views/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('placesIndex', {
      url: '/places',
      templateUrl: '/js/views/places/index.html',
      controller: 'PlacesIndexCtrl as placesIndex'
    })
    .state('placesShow', {
      url: '/places/:googlePlacesId',
      templateUrl: '/js/views/places/show.html',
      controller: 'PlacesShowCtrl as placesShow'
    });

  $urlRouterProvider.otherwise('/');
}

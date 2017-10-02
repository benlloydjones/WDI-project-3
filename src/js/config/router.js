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
    .state('drinkPlacesIndex', {
      url: '/drinkPlaces',
      templateUrl: '/js/views/drinkPlaces/index.html',
      controller: 'DrinkPlaceIndexCtrl as drinkPlacesIndex'
    });

  $urlRouterProvider.otherwise('/');
}

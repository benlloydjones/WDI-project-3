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
<<<<<<< HEAD
    .state('profile', {
      url: '/profile',
      templateUrl: 'js/views/profile.html',
      controller: 'ProfileCtrl as profile'
=======
    .state('drinkPlacesIndex', {
      url: '/drinkPlaces',
      templateUrl: '/js/views/drinkPlaces/index.html',
      controller: 'DrinkPlaceIndexCtrl as drinkPlacesIndex'
>>>>>>> c395ccceb609acb68bfd79b04699e92d6816a4a7
    });

  $urlRouterProvider.otherwise('/');
}

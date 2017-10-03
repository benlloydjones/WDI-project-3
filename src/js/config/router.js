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
    .state('profile', {
      url: '/profile',
      templateUrl: 'js/views/profile.html',
      controller: 'ProfileCtrl as profile'
    })
    .state('placesIndex', {
      url: '/places',
      templateUrl: '/js/views/places/index.html',
      controller: 'placesIndexCtrl as placesIndex'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: 'js/views/users/usersShow.html',
      controller: 'UsersShowCtrl as usersShow'
    })
    .state('usersIndex', {
      url: '/users',
      templateUrl: 'js/views/users/usersIndex.html',
      controller: 'UsersIndexCtrl as usersIndex'
>>>>>>> profileShow
    });

  $urlRouterProvider.otherwise('/');
}

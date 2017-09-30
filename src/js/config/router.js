angular
  .module('pubMeetApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('drinkPlacesIndex', {
      url: '/',
      templateUrl: 'js/views/drinkPlaces/index.html',
      controller: 'DrinkPlacesIndexCtrl as drinkPlacesIndex'
    })
    .state('drinkPlacesShow', {
      url: '/drinkPlaces/:id',
      templateUrl: 'js/views/drinkPlaces/show.html',
      controller: 'DrinkPlacesShowCtrl as drinkPlacesShow'
    });

  $urlRouterProvider.otherwise('/');
}

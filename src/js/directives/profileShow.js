angular
  .module('pubMeetApp')
  .directive('profileShow', profileShow);

function profileShow() {
  return {
    restrict: 'E',
    templateUrl: 'js/views/directives/profileShow.html',
    scope: {
      user: '='
    }
  };
}

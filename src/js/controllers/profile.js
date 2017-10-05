angular
  .module('pubMeetApp')
  .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$auth', '$state', 'User', 'meetUp'];
function ProfileCtrl($auth, $state, User, meetUp) {
  const vm = this;
  vm.user = null;
  vm.location = $state.$current.name;
  vm.events = null;
  const { userId } = $auth.getPayload();

  User
    .get({ id: userId })
    .$promise
    .then(user => vm.user = user)
    .then(() => getUsersEvents(vm.user.accessToken));

  function getUsersEvents(accessToken) {
    meetUp.getUsersEvents(accessToken)
      .then(response => vm.events = response);
  }

  vm.logout = logout;
  function logout() {
    $auth.logout();
    $state.go('login');
  }

}

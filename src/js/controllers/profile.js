angular
  .module('pubMeetApp')
  .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$auth', '$state', 'User'];
function ProfileCtrl($auth, $state, User) {
  const vm = this;
  const { userId } = $auth.getPayload();

  vm.location = $state.$current.name;

  if(userId) vm.user = User.get({ id: userId });

  vm.logout = logout;
  function logout() {
    $auth.logout();
    $state.go('login');
  }

}

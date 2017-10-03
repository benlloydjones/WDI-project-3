angular
  .module('pubMeetApp')
  .controller('UsersIndexCtrl', UsersIndexCtrl);

UsersIndexCtrl.$inject = ['User'];
function UsersIndexCtrl(User) {
  const vm = this;
  vm.all = null;
  User
    .query()
    .$promise
    .then(users => vm.all = users);
}

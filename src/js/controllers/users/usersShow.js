angular
  .module('pubMeetApp')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['$auth', '$state', 'User', 'Comment'];
function UsersShowCtrl($auth, $state, User, Comment) {
  const vm = this;
  vm.user = null;
  vm.location = $state.$current.name;
  vm.addFriend = addFriend;
  vm.removeFriend = removeFriend;
  vm.logout = logout;
  vm.isFriend = null;
  vm.comments = null;

  loadPage();

  function loadPage() {
    User
      .get($state.params)
      .$promise
      .then(user => {
        vm.user = user;
        const { userId } = $auth.getPayload();
        if(userId) {
          User
            .get( { id: userId })
            .$promise
            .then( currentUser => {
              vm.currentUser = currentUser;
              getCurrentUserFriendsIds();
              findIsFriend();
            });
        }
      })
      .then(() => {
        Comment
          .query({ user: vm.user.id })
          .$promise
          .then(comments => {
            vm.comments = comments;
            vm.pubsSet = new Set();
            vm.comments.forEach(comment => vm.pubs.add(comment.googlePlacesId));
          });
      })
      .catch(err => console.log('loadPage error: ', err));
  }

  function getCurrentUserFriendsIds() {
    vm.currentFriendsIds = vm.currentUser.friends.map(friend => friend.id);
  }

  function findIsFriend() {
    vm.isFriend = (vm.currentFriendsIds.includes(vm.user.id) ? true : false);
  }

  function updateCurrentUser() {
    User
      .update(vm.currentUser.id, vm.currentUser)
      .$promise
      .catch(err => console.log(err));
  }

  function addFriend() {
    getCurrentUserFriendsIds();
    vm.currentFriendsIds.push(vm.user.id);
    vm.currentUser.friends = vm.currentFriendsIds;
    vm.isFriend = true;
    updateCurrentUser();
    loadPage();
  }

  function removeFriend() {
    getCurrentUserFriendsIds();
    vm.currentFriendsIds = vm.currentFriendsIds.filter(friendId => friendId !== vm.user.id);
    vm.currentUser.friends = vm.currentFriendsIds;
    vm.isFriend = false;
    updateCurrentUser();
    loadPage();
  }

  function logout() {
    $auth.logout();
    $state.go('login');
  }

}

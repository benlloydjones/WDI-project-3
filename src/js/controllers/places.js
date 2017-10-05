angular
  .module('pubMeetApp')
  .controller('PlacesIndexCtrl', PlacesIndexCtrl)
  .controller('PlacesShowCtrl', PlacesShowCtrl);

function PlacesIndexCtrl() {
  const vm = this;
  vm.type = 'bar';
  vm.center = { lat: 51.5, lng: -0.12 };
  vm.results = [];

  vm.searchParams = null;

  function updateSearchParams() {
    vm.searchParams = {
      location: vm.center,
      radius: 10000,
      type: [vm.type],
      keyword: vm.q
    };
  }

  vm.updateSearchParams = updateSearchParams;
}

PlacesShowCtrl.$inject = ['$state', '$scope', 'Comment', 'User', '$auth'];
function PlacesShowCtrl($state, $scope, Comment, User, $auth) {
  const vm     = this;
  vm.place = null;
  vm.newComment = {
    googlePlacesId: $state.params.googlePlacesId
  };
  const { userId } = $auth.getPayload();

  function getAvgRating(comments, place) {
    const totalRating = comments.reduce((sum, comment) => sum += (comment.rating || 0), 0);
    return (comments.length > 0 ? totalRating / comments.length : place.rating);
  }

  $scope.$watch(() => vm.place, () => {
    if(!vm.place) return false;
    Comment
      .query({ googlePlacesId: $state.params.googlePlacesId })
      .$promise
      .then(comments => {
        vm.comments = comments;
        vm.place.avgRating = getAvgRating(comments, vm.place);
      });
  });

  // grabbing google places id from the URL and constructing a request object to be used later
  vm.details = { placeId: $state.params.googlePlacesId };

  function commentsCreate() {
    console.log('form submitted');
    User
      .get({ id: userId })
      .$promise
      .then(user => {
        vm.newComment.user = user.id;
        vm.currentUser = user;
      })
      .then(() => {
        Comment
          .save(vm.newComment)
          .$promise
          .then(() => {
            vm.newComment.user = vm.currentUser;
            vm.comments.push(vm.newComment);
            vm.place.avgRating = getAvgRating(vm.comments, vm.place);
            vm.newComment = {
              googlePlacesId: $state.params.googlePlacesId
            };
          });
      })
      .catch(err => console.log(err));
  }
  vm.commentsCreate = commentsCreate;
}

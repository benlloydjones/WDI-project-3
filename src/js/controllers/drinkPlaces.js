angular
  .module('pubMeetApp')
  .controller('DrinkPlacesIndexCtrl', DrinkPlacesIndexCtrl)
  .controller('DrinkPlacesShowCtrl', DrinkPlacesShowCtrl);

DrinkPlacesIndexCtrl.$inject = ['DrinkPlace'];
function DrinkPlacesIndexCtrl(DrinkPlace) {
  const vm = this;

  vm.all = DrinkPlace.query();
}

DrinkPlacesShowCtrl.$inject = ['DrinkPlace', '$state', 'DrinkPlaceComment'];
function DrinkPlacesShowCtrl(DrinkPlace, $state, DrinkPlaceComment) {
  const vm = this;
  vm.newComment = {};
  vm.post = DrinkPlace.get($state.params);


  function addComment() {
    DrinkPlaceComment
      .save({ DrinkPlaceId: vm.DrinkPlace.id }, vm.newComment)
      .$promise
      .then((comment) => {
        vm.post.comments.push(comment);
        vm.newComment = {};
      });
  }

  vm.addComment = addComment;

  function deleteComment(comment) {
    DrinkPlaceComment
      .delete({ postId: vm.post.id, id: comment.id })
      .$promise
      .then(() => {
      //locate the comment in the array of comments
        const index = vm.post.comments.indexOf(comment);
        // splice it from the array, take 1 element starting from that index
        vm.post.comments.splice(index, 1);
      });
  }
  vm.deleteComment = deleteComment;
}

angular
  .module('pubMeetApp')
  .factory('Comment', Comment);

Comment.$inject = ['$resource'];
function Comment($resource) {
  return new $resource('/api/comments/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

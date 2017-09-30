angular
  .module('pubMeetApp')
  .factory('DrinkPlace', DrinkPlace );

DrinkPlace.$inject = ['API', '$resource'];
function DrinkPlace(API, $resource) {
  return $resource(`${API}/bar/:id`, { id: '@id' }, {
    'update': { method: 'PUT' }
  });
}

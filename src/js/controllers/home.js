/* global Typed:ignore */

angular
  .module('pubMeetApp')
  .controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = [];
function HomeCtrl() {
  const vm = this;

  new Typed('.element', {
    strings: ['meetups?', 'pubs?', 'parties?', 'atmosphere?', 'beers?', 'fun?', 'a knees up?'],
    typeSpeed: 125,
    loop: true,
    backDelay: 1000
  });

}

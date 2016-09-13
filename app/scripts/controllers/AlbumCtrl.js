(function() {
  function AlbumCtrl(Fixtures) {
    this.albumData = Fixtures.getAlbum();
    console.log(this.albumData);
  }
  
  angular
    .module('blocJams')
    .controller('AlbumCtrl',['Fixtures', AlbumCtrl]);
})();












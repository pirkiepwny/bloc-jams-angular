(function() {
  function SongPlayer() {
    var SongPlayer = {};
    var song;
    var currentBuzzObject = null;
  /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
var setSong = function(song) {
  if (currentBuzzObject) {
    currentBuzzObject.stop();
    SongPlayer.currentSong.playing = null;
  }
 /**
* @desc Buzz object audio file
* @type {Object}
*/  
  currentBuzzObject = new buzz.sound(song.audioUrl, {
    formats: ['mp3'],
    preload: true
 });

  SongPlayer.currentSong = song;

};


SongPlayer.currentSong = null;
//testing


var playSong = function(song) {
  currentBuzzObject.play();
  song.playing = true;
}
/**
 * @function play
 * @desc Play current or new song
 * @param {Object} song
 */
SongPlayer.play = function(song) {
  console.log(song);
  song = song || SongPlayer.currentSong;
  console.log(song);
  if ( SongPlayer.currentSong !== song ) {
    console.log("song is not the current playing");
    setSong(song);
    playSong(song);
} else if (SongPlayer.currentSong === song) {
    console.log("song is current song")
    if (currentBuzzObject.isPaused()) {
      currentBuzzObject.play();
    }
  }
};
 /**
 * @function pause
 * @desc Pause current song
 * @param {Object} song
 */
SongPlayer.pause = function() {
  song = song || SongPlayer.currentSong;
  currentBuzzObject.pause();
  song.playing = false;
};

return SongPlayer;
}

angular
  .module('blocJams')
  .factory('SongPlayer', SongPlayer);

})();
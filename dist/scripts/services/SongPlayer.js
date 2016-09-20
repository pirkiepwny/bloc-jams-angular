(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};
    var currentAlbum = Fixtures.getAlbum();
    var song;
    var currentBuzzObject = null;
/**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
*/
  var setSong = function(song) {
    if (currentBuzzObject) {
      stopSong(song);
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

  var getSongIndex = function(song) {
    return currentAlbum.songs.indexOf(song);
  };

  SongPlayer.currentSong = null;

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

  SongPlayer.previous = function() {
    var currentSongIndex = getSongIndex(SongPlayer.currentSong);
    currentSongIndex--;

    if (currentSongIndex < 0) {
      stopSong(song);

    } else {
      var song = currentAlbum.songs[currentSongIndex];
      setSong(song);
      playSong(song);
    }
  };
  SongPlayer.next = function() {
    var currentSongIndex = getSongIndex(SongPlayer.currentSong);
    currentSongIndex++;

    if (currentSongIndex < 0) {
      stopSong(song);
      console.log(currentAlbum.songs[currentSongIndex]);
    } else {
      var song = currentAlbum.songs[currentSongIndex];
      setSong(song);
      playSong(song);
      console.log(currentAlbum.songs[currentSongIndex]);
    }
  };

  var stopSong = function() {
    currentBuzzObject.stop();
    SongPlayer.currentSong.playing = null;
  }


  return SongPlayer;
}

angular
  .module('blocJams')
  .factory('SongPlayer', SongPlayer);

})();
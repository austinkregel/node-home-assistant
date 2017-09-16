global.Log = new require('./src/Utils/Log.js');
global.Head = new require('./src/Core/bootstrap');
global.Mouth = new Head.Mouth();

const SpotifyWebSpotify = require('spotify-web-helper');
global.Spotify= SpotifyWebSpotify();

Spotify.player.on('error', err => {
    if (error.message.match(/No user logged in/)) {
        // also fires when Spotify client quits
    } else {
        // other errors: /Cannot start Spotify/ and /Spotify is not installed/
    }
});
Spotify.player.on('ready', () => {

    // Playback events
    Spotify.player.on('play', () => {
    });
    Spotify.player.on('pause', () => {
    });
    Spotify.player.on('end', () => {
    });
    Spotify.player.on('track-will-change', track => {
    });
    Spotify.player.on('status-will-change', status => {
    });

    // Playback control. These methods return promises
    //  Spotify.player.play('spotify:track:4uLU6hMCjMI75M1A2tKUQC');
    //  Spotify.player.pause();
    //  Spotify.player.seek();

    // Get current playback status, including up to date playing position
    Log.info('Spotify Ready');
    // 'status': {
    //    'track': ...,
    //    'shuffle': ...,
    //    'playing_position': ...
    //  }

});

if(process.env.CAN_SERVE) {
    require('./server')
} else {
    new Head.Ears((results) => {
        "use strict";
        global.IS_MESSAGE_TEXT = false;
        Log.alert(Head.Brain.canYou(results))
    });

}

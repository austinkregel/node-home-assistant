let Action = require('../../Utils/Action')

module.exports = class PlaySong extends Action {
    constructor() {
        super()
        this.intent = 'music';
        this.description = 'Play your music';

        this.addTag('Play song by artist', {song: [1,1], artist:[3,3]}, 'music:artist-song')
        this.addTag('Play long artist', {artist:[1,2]}, 'music:arist')
    }

    resolve(song, artist) {
        if(typeof artist === 'object'){
            // Artist is not set as a string so we can just use it to create a music playlist based on the artist.
            let text = 'Creating a station for songs by ' + song;
            this.respond(() => Mouth.say(text), () => Mouth.text(text)
                .then(res => {
                    Log.debug(res)
                })
                .catch(res => {
                    Log.debug('error', res)
                }));
        } else {
            // Artist is set so both songs and artist can be used to search for muisc.
            let text = 'Playing ' + song + ' by ' + artist;

            this.respond(() => Mouth.say(text), () => Mouth.text(text)
                .then(res => {
                    Log.debug(res)
                })
                .catch(res => {
                    Log.debug('error', res)
                }));
        }
    }
}

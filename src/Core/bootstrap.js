let Brain = new (new require('../Core/Learn')),
    PlaySong = new require('../Actions/PlaySong'),
    Weather = new require('../Actions/Weather'),
    Help = new require('../Actions/Help'),
    UnknownAction = new require('../Actions/UnknownAction'),
    Remember = new require('../Actions/Remember'),
    News = new require('../Actions/News')
global.Database = new (new require('../Utils/Database'));

Brain.use(new PlaySong())
Brain.use(new Weather())
Brain.use(new Help());
Brain.use(new UnknownAction());
Brain.use(new Remember());
Brain.use(new News())

module.exports = {
    Mouth: require('./Mouth'),
    Brain: Brain,
    Ears: new require('./Ears')
}

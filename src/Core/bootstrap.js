let Brain = new (new require('../Core/bootstrap')),
    PlaySong = new require('./Actions/PlaySong'),
    Weather = new require('./Actions/Weather'),
    OrderFood = new require('./Actions/OrderFood'),
    // Help = new require('./Actions/Help'),
    Text = new require('./Actions/Text'),
    UnknownAction = new require('./Actions/UnknownAction'),
    Remember = new require('./Actions/Remember')
global.Database = new (new require('../Utils/Database'));

Brain.use(new PlaySong())
Brain.use(new Weather())
Brain.use(new OrderFood())
// Brain.use(new Help());
Brain.use(new Text());
Brain.use(new UnknownAction());
Brain.use(new Remember());

module.exports = {
    Mouth: require('./Mouth'),
    Brain: Brain,
   Ears: new require('./Ears')
}

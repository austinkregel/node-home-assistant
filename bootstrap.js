global.Log = new require('./src/Utils/Log.js');
global.Head = new require('./src/Head/bootstrap');
global.Mouth = new Head.Mouth();
global.IS_MESSAGE_TEXT = false; // true for text, false for voice

if(process.env.CAN_SERVE) {
    require('./server')
} else {
    new Head.Ears((results) => {
        "use strict";
        global.IS_MESSAGE_TEXT = false;
        Log.alert(Head.Brain.canYou(results))
    });

}

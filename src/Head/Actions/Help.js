let Action = require('../../Utils/Action'),
    Brain = require('../bootstrap').Brain
module.exports = class Help extends Action {
    constructor() {
        super()
        this.addTag('help', {}, 'help')
        this.addTag('what can I do', {}, 'help')
        this.addTag('what can I say', {}, 'help')
    }

    resolve() {
        if(global.IS_MESSAGE_TEXT) {
            Mouth.say("I will text you the list of things you can say.")
        }
        let textToSend = 'Here is what I can do\n';
        // for(let intent in Brain.plugins)
        // {
        //     if(Brain.plugins[intent].description && Brain.plugins[intent].description!=='')
        //         textToSend += '     ' + Brain.plugins[intent].description + "\n"
        // }
        Mouth.text(textToSend)
            .then(res => {
                Log.debug('Message sent!')
            })
            .catch(err => {
                Log.debug('I could not send the message, did you configure the settings properly?')
            })
    }
}

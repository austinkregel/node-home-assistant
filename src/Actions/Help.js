let Action = require('../Utils/Action'),
    Brain = require('../Core/bootstrap').Brain
module.exports = class Help extends Action {
    constructor() {
        super()
        this.addTag('help', {}, 'help')
        this.addTag('what can I do', {}, 'help')
        this.addTag('what can I say', {}, 'help')
    }

    resolve() {
        let textToSend = 'Here is what I can do\n';
        // for(let intent in Brain.plugins)
        // {
        //     if(Brain.plugins[intent].description && Brain.plugins[intent].description!=='')
        //         textToSend += '     ' + Brain.plugins[intent].description + "\n"
        // }
        this.respond(() => Mouth.say(textToSend),() => Mouth.text(textToSend))
    }
}

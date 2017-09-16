let Action = require('../Utils/Action')

module.exports = class UnknownAction extends Action {
    constructor() {
        super()

        this.addTag('', {}, 'unknown-intent')
    }

    resolve() {
        // song is the real artist
        this.respond(() => Mouth.say('Unknown intent, try saying help'), () => Mouth.text('I DON\'T KNOW HOW TO DEAL WITH THAT!!')
            .then(res => {
                Log.debug(res)
            })
            .catch(res => {
                Log.debug('error', res)
            }))
    }
}

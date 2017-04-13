let Action = require('../../Utils/Action')

module.exports = class Remember extends Action {
    constructor() {
        super()
        this.addTag('call me austin', {name: [2,2]}, 'remember:name')
        this.addTag('remember things and stuff', {toRemember: [1,3]}, 'remember:item')
    }

    resolve(thingToRemember) {
        switch(arguments[arguments.length - 1].subIntent) {
            case 'remember:name':
                Log.debug('Okay, I\'ll remember that your name is ' + thingToRemember)
                this.respond(
                    () => Mouth.say("Okay I'll remember that your name is " + thingToRemember),
                    () => Mouth.say("Okay I'll remember that your name is " + thingToRemember)
                        .then(res => {
                            Log.debug(res)
                        })
                        .catch(res => {
                            Log.debug('error', res)
                        })
                )
                break;
            case 'remember:item':
                Log.debug('Okay, I\'ll remember ' + thingToRemember)
                // Mouth.say('Okay, ill remember that!')
                break;
        }
    }
}

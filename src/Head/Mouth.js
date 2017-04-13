var say = require('say');
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN);

module.exports = class Mouth {
    constructor() {
    }

    say(words) {
        say.speak(words)

    }

    sayApi(words) {
        return {message: words}
    }

    text(message) {
        Log.debug('asking to send: ', message, 'to', Database.get('user.phone'))
        return this.twilio(Database.get('user.phone'), message);
    }

    // Need to get twilio to work.... :/

    twilio(to, body) {
        return new Promise((resolve, reject) => {
            client.messages.create({
                messagingServiceSid: process.env.TWILIO_SID,
                to: to,
                body: body,
            }).then(resolve)
                .catch(function(err) {
                    console.log(err)
                })
        })
    }
};

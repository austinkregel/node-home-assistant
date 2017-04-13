var env = require('node-env-file'),
    moment = require('moment')
env(__dirname + '/../../.env')
module.exports = {
    debug() {
        if (process.env.APP_DEBUG == 'true') {
            let data = ['[d ' + moment().format('YYYY-MM-DD hh:mm:ss')+  ']'].concat(Object.values(arguments));
            console.log.apply(console, data)
        }
    },
    info() {
        console.log.apply(console, ['[-]'].concat(Object.values(arguments)))

    },
    alert() {
        console.log.apply(console, ['[!]'].concat(Object.values(arguments)))
    },
}

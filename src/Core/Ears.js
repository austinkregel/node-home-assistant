const Sonus = require('sonus')
var speech = require('@google-cloud/speech')({
    projectId: process.env.GOOGLE_PROJECT_ID,
    keyFilename: process.env.GOOGLE_KEY_FILE
});
const hotwords = [
    { file: __dirname + '/../../data/sonus.pmdl',
        hotword: 'sonus' }]
const sonus = Sonus.init({ hotwords }, speech)

module.exports = class Ears  {
    constructor(callback){
        Sonus.start(sonus)
        sonus.on('hotword', (index, keyword) => {
            Log.info('Listening')
        })
        sonus.on('final-result', callback)
        Log.info('Listening for SONUS')
    }
}

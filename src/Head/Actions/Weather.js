let Action = require('../../Utils/Action')
let geo = require('node-geocoder')({
    provider: 'google',
    apiKey: 'AIzaSyAhklbx73LjRTN_Gf8ivRfsFba1Lhvz2r0'
});

let axios = require('axios')

module.exports = class Weather extends Action {
    constructor() {
        super()
        this.description = 'Get your weather';

        this.addTag('weather near me', {}, 'weather')
        this.addTag('my weather', {}, 'weather')

        this.addTag('weather in Black River', {city: [2, 3]}, 'weather:city')
        this.addTag('weather near Black River', {city: [2, 3]}, 'weather:city')
        this.addTag('weather by Black River', {city: [2, 3]}, 'weather:city')


        this.addTag('weather in Black River New York', {city: [2, 3], state: [4, 5]}, 'weather:location')
        this.addTag('weather by Black River New York', {city: [2, 3], state: [4, 5]}, 'weather:location')
        this.addTag('weather near Black River New York', {city: [2, 3], state: [4, 5]}, 'weather:location')
        this.addTag('weather in Owosso Michigan', {city: [2, 2], state: [3, 3]}, 'weather:location')
        this.addTag('weather by Owosso Michigan', {city: [2, 2], state: [3, 3]}, 'weather:location')
        this.addTag('weather near Owosso Michigan', {city: [2, 2], state: [3, 3]}, 'weather:location')

    }

    resolve(city, state) {
        // Mouth.say('Okay, I\'ll look for weather near ' + city + ', ' + state)
        Log.info.apply(Log, arguments)
        if (city && state) {
            geo.geocode(city + ', ' + state, (err, res) => {
                if (err) throw err
                let sureItsALocation = res[0];
                let loc = sureItsALocation.latitude + ',' + sureItsALocation.longitude
                axios.get('https://api.darksky.net/forecast/' + process.env.DARK_SKY_KEY + '/' + loc)
                    .then(res => {
                        let result = 'The current tempurature is ' + res.data.currently.temperature + ' degrees. Then there will be ' + res.data.daily.summary;
                        this.respond(
                            () => Mouth.say(result),
                            () => Mouth.text(result)
                                .then(res => {
                                    Log.debug(res)
                                })
                                .catch(res => {
                                    Log.debug('error', res)
                                })
                        )
                    })
            });
        } else if (city) {
            Log.debug(city)
        } else {
            geo.geocode(process.env.MY_ZIPCODE, (err, res) => {
                if (err) throw err
                let sureItsALocation = res[0];
                let loc = sureItsALocation.latitude + ',' + sureItsALocation.longitude
                axios.get('https://api.darksky.net/forecast/' + process.env.DARK_SKY_KEY + '/' + loc)
                    .then(res => {
                        let result = 'The current tempurature is ' + res.data.currently.temperature + ' degrees. Then there will be ' + res.data.daily.summary
                        this.respond(
                            () => Mouth.say(result),
                            () => Mouth.text(result)
                                .then(res => {
                                    Log.debug(res)
                                })
                                .catch(res => {
                                    Log.debug('error', res)
                                })
                        )
                    })
            });
        }
    }

}

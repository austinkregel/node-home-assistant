let Action = require('../Utils/Action')
let geo = require('node-geocoder')({
    provider: 'google',
    apiKey: 'AIzaSyAhklbx73LjRTN_Gf8ivRfsFba1Lhvz2r0'
});

let axios = require('axios')

module.exports = class Weather extends Action {
    constructor() {
        super()
        this.description = 'Get your weather';

        this.addTag('wwhats the weather', {generic: [0,2]}, 'weather')

        this.addTag('weather in Black River', {city: [2, 3]}, 'weather:city')
        this.addTag('weather for Black River', {city: [2, 3]}, 'weather:city')
        this.addTag('weather near Black River', {city: [2, 3]}, 'weather:city')
        this.addTag('weather by Black River', {city: [2, 3]}, 'weather:city')


        this.addTag('weather in Black River New York', {city: [2, 3], state: [4, 5]}, 'weather:location')
        this.addTag('weather for Black River New York', {city: [2, 3], state: [4, 5]}, 'weather:location')
        this.addTag('weather by Black River New York', {city: [2, 3], state: [4, 5]}, 'weather:location')
        this.addTag('weather near Black River New York', {city: [2, 3], state: [4, 5]}, 'weather:location')

    }

    resolve(city, state) {
        Log.info(arguments)
        Log.debug({city, state})
        if (city && state &&  !state.hasOwnProperty('extracted')) {
            geo.geocode(city + ', ' + state, (err, res) => {
                if (err) throw err
                Log.debug(res);
                let sureItsALocation = res[0];
                let loc = sureItsALocation.latitude + ',' + sureItsALocation.longitude
                axios.get('https://api.darksky.net/forecast/' + process.env.DARK_SKY_KEY + '/' + loc)
                    .then(res => {
                        let result = 'The current tempurature is ' + res.data.currently.temperature + ' degrees. Then there will be ' + res.data.daily.summary;
                        this.respond(
                            () => Mouth.say(result),
                            () => Mouth.text(result)
                        )
                    }).catch(res => {
                        Log.info(res)
                })
            });
        } else {
            geo.geocode(process.env.MY_ZIPCODE, (err, res) => {
                if (err) throw err
                Log.debug(res);
                let sureItsALocation = res[0];
                let loc = sureItsALocation.latitude + ',' + sureItsALocation.longitude
                axios.get('https://api.darksky.net/forecast/' + process.env.DARK_SKY_KEY + '/' + loc)
                    .then(res => {
                        let result = 'The current tempurature is ' + res.data.currently.temperature + ' degrees. Then there will be ' + res.data.daily.summary
                        this.respond(
                            () => Mouth.say(result),
                            () => Mouth.text(result)
                        )
                    })
                    .catch(d => {
                        Log.debug({d})
                    })
            });
        }
    }

}

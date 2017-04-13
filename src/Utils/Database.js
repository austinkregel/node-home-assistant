var crypt = require("crypto-js");
var fs = require('fs')
module.exports = class Database {
    constructor() {
        this.data = null;

        if(fs.existsSync(__dirname + '/../../data/database.json')) {
            this.data = JSON.parse(fs.readFileSync(__dirname + '/../../data/database.json'));
            return;
        } else {
            fs.writeFileSync(__dirname + '/../../data/database.json', [])
        }
    }
    search(search) {
        return this.traverse(search, this.data)
    }

    get(dotNotation) {
        let result = this.getDyamically(this.data, dotNotation)
        if(!result) {
            throw new Error('No results found from database');
        }
        return result;
    }

    getDyamically(obj, propString) {
        if (!propString)
            return obj;

        var prop, props = propString.split('.');

        for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
            if(!obj) return obj

            prop = props[i];

            var candidate = obj[prop];
            if (candidate !== undefined) {
                obj = candidate;
            } else {
                break;
            }
        }
        return obj[props[i]];
    }

    save () {
        fs.writeFile(__dirname + '/../../data/database.json', this.data, null, () => {
            Log.debug('Database file saved')
        })
    }
    traverse(search, jsonObj) {
        if( typeof jsonObj == "object" ) {
            for(var key in jsonObj){
                if(key.test('(.*)'+search +'(.*)')){
                    return jsonObj;
                } else if (typeof jsonObj[key] === 'string' && jsonObjec[key].test('(.*)'+search +'(.*)')){
                    return jsonObj;
                }
                // the type is an object
                return traverse(search, jsonObj[key]);
            };
        } else {
            return jsonObj
        }
    }
}

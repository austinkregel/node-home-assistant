var summary = require('node-summary');
var textract = require('textract')
var Promise = require('promise');
var summarizeP = Promise.denodeify(summary.summarize);

module.exports = class Summerizer {
    constructor() {

    }

    file(filePath) {
        return new Promise((resolve, reject) => {
            textract.fromFileWithPath(filePath, function (error, text) {
                "use strict";
                if (error) {
                    reject(error);
                    return;
                }
                this.raw(text).then(resolve).catch(reject)
            })
        })
    }

    url(url) {
        return new Promise((resolve, reject) => {
            textract.fromUrl(url, function( error, text ) {
                "use strict";
                if (error) {
                    reject(error);
                    return;
                }
                this.rawText(text).then(resolve).catch(reject)
            })
        })
    }

    raw(text) {
        return this.rawText(text);
    }

    rawText(text) {
        return new Promise((resolve, reject) => {
            return summarizeP('', text).then(function (summary) {
                resolve({text, summary});
            }, reject);
        });
    }
}

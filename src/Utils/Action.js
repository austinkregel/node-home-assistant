/*
    Actions are what happens when you have a command resolve.
    The action happens.
    Then lastly, your callback will run. That way the callback recieves the parameters to match the tagged items.
 */
let  MySam = require('mysam-extract');
var natural = require('natural'),
    _ = require('lodash')
module.exports = class Action {
    constructor() {
        this.sentences = [];
        this.tags = []
        this.extractedPair = {};
        this.callIt = false;
        this.description = '';
    }


    addTag(sentence, tags, subIntent) {
        if(Array.isArray(sentence)){
            sentence.forEach((value, key) => {
                this.addTag(value, tags, subIntent);
            })
        }
        this.sentences.push(sentence)
        let extracted = MySam.extractor(sentence);

        extracted.tag(tags)
        this.extractedPair[sentence] = {
            extracted,
            subIntent,
            tags
        };
    }

    /**
     * This loops through all of the extracted
     * @param sentence
     */
    run(sentence) {
        let extractor = null,
            alreadyCalled = false;
        // For all extracted actions, loop
        for(var sentence_ in this.extractedPair) {
            let epair = this.extractedPair[sentence_];
            extractor = epair.extracted
            // Pull the action's sentence and extract the tags.
            let extracted = extractor.extract(sentence)
            // Loop for all tags
            let parameters = null;
            if (!_.isEqual(epair.tags, {})) {
                for (var tag in extracted.extracted) {
                    // If the tag is not null.
                    if (extracted.extracted[tag] !== null) {
                        this.callIt = true;
                    }
                }
                parameters = Object.values(extracted.extracted).concat([epair]);
                parameters.forEach((el, i) => {
                    if (el === null || el === undefined) {
                        this.callIt = false;
                    }
                })
            } else {
                this.callIt = true;
                parameters = {}
            }
            if (this.callIt && !alreadyCalled) {
                this.resolve.apply(this, parameters)
                this.callIt = false
                alreadyCalled = true;
                break;
            }
        }
    }
    respond(isSpeech, isText) {
        if(global.IS_MESSAGE_TEXT){
            return isText();
        }
        return isSpeech()
    }

    resolve() {
        throw new Error("You must override the default resolve method")
    }
}


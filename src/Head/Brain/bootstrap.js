const fs = require('fs'),
    natural = require('natural'),
    _ = require('lodash'),
    plugins = [],
    summerizer = new require('./Summerizer'),
    mysam = require('mysam-extract'),
    assign = require('lodash').assign,
    NaturalSynaptic = require('natural-synaptic'),
    Bus = require('../../Utils/Bus');

module.exports = class Brain {
    constructor() {
        Log.info('Brain being constructed')
        this.extractions = {};
        this.plugins = {};
        this.memories = {};
        this.definedIntents = [];
        this.natural = natural;
        this.classifier = new NaturalSynaptic();
        // Should be able to set the
        this.natural.LancasterStemmer.attach();
        // Need to know if the neural network needs to be trained or retrained.
        this.needsToBeRetrained = true;

    }

    /**
     * Here we return the ectracted value from the given intents.
     * @param sentence
     * @param intent
     * @returns {*}
     */
    extract(sentence, intent){
        return this.extractions[intent].extract(sentence);
    }

    /**
     * This is how we get the data for the emited intent events.
     * @param intent
     * @param sentence
     * @param tags
     */
    buildExtraction(intent, sentence, tags) {
        let extracted = mysam.extractor(sentence);
        // Tag the extracted data
        extracted.tag(tags);
        // Set it equal to the given intent object
        this.extractions[intent] = extracted;
        // I think extractions is an array or object later on in the code... Someone remind me about this.
    }

    /**
     * Returns a promise of the summery, with the resolved function being the summery
     * @param text
     * @returns Promise
     */
    summerize(text) {
        // See if the text is a link
        if((new RegExp('^(https?:\/\/)|(http:\/\/)')).test(text)) {
            return summerizer.url(text)
        //So it's not a link, how about the absolute path of a file?
        } else if((new RegExp('^(\/)')).test(text)){
            return summerizer.file(text);
        }
        // Nope? Must just be some raw text.
        return summerizer.raw(text)
    }

    /**
     * Here we build the association of a given intent to the action
     * @param action
     */
    use(action) {
        "use strict";
        this.plugins[action.intent] = action

        // this.associate(action.intent, action.sentences, action)
        for(var sentence in action.extractedPair){
            Log.debug('Learning the association of ' + action.extractedPair[sentence].subIntent + ' and ' + sentence);
            this.associate(action.extractedPair[sentence].subIntent, sentence, action)
        }
    }

    /**
     * Here we train the neural network on the proper values
     *
     * @param intent
     * @param infoToRemember
     * @param callback
     */
    associate(intent, infoToRemember, callback) {
        // If the info to remember isn't an array, make it one.
        if (!Array.isArray(infoToRemember)) {
            infoToRemember = [infoToRemember]
        }
        // set the memories to an empty array
        if (typeof this.memories[intent] !== 'object')
            this.memories[intent] = [];

        // memory length before adding info.
        let b4 = this.memories[intent].length;
        // add info to memories.
        this.memories[intent].push(infoToRemember)
        // Make all memories unqiue
        this.memories[intent] = _.uniq(this.memories[intent])
        // get after memories
        let a4 = this.memories[intent].length;
        // if before memories is lessthan after memories add the document
        // And train the classifier, then save the brain file.
        if (b4 < a4) {
            // Add the information to the classifier with the associations
            infoToRemember.forEach((v, k) => {
                this.classifier.addDocument(v, intent);
            })
            // Train the classifier on the given information
            if (this.needsToBeRetrained) {
                // We cannot train the classifier after every association... It just won't work.
                this.classifier.train();
                this.needsToBeRetrained = false;
            } else {
                // Retrain or "update" the document.
                this.classifier.retrain();
            }
            // This makes sure that any given intent is not already defined in the array
            // Basically prevents douplicates.
            if (_.isEqual(_.intersection(this.definedIntents, [intent]),[])) {
                if (typeof callback === 'object') {
                    // Set the resolved intent action
                    Bus.on('resolve:' + intent, (sentence) => {
                        // We need to call a spesific method from the action called run.
                        // Pass through the resolved sentence
                        callback.run(sentence)
                    })

                } else {
                    // Set the resolved intent callback
                    Bus.on('resolve:' + intent, callback)
                }
                this.definedIntents.push(intent);
                Log.debug('Setting callback for [' + intent + ']')
            }
        }
    }

    /**
     * Classify the given text. If the text could be classified, classify it.
     * Otherwise throw the needed exception.
     * @param text
     * @returns {*}
     */
    canYou(text) {
        try {
            let classified = this.classifier.classify(text);
            // If the classifier can classify, gotta make sure that it emits the given event
            Bus.emit('resolve:' + classified, text)
            // Returned the classified words
            Log.info({classified, text})
            return classified;
        } catch (err) {
            // Throw error because we couldn't classify the text
            throw err;
            Log.debug("Your classifier has not been trained.")
        }
    }
}

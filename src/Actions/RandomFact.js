const Action = require('../../Utils/Action'),
    axios = require('axios')
module.exports = class RandomFact extends Action {
    constructor() {
        super()
        this.addTag([
            'Who won some metal',
            'who is john smith',
            'where is time square',
            'when did things happen',
            'what is moscato wine',
        ], {question: [0, 3]}, 'ask-quesion')

        this.addTag('what qqqq', {question: [0, 1]}, 'ask-question')
    }

    resolve(question) {

    }

    search(text) {
        axios.get('https://api.duckduckgo.com/?q=' + question + '&format=json')
            .then(res => {
                if (res.data.RelatedTopics.length > 0) {
                    this.respond(() => Mouth.say(res.data.RelatedTopics[0].Test),
                        () => Mouth.text(res.data.RelatedTopics[0].Test));
                }
                this.search()
            })
            .catch(res => {

            })
        this.respond(() => Mouth.say(text),
            () => Mouth.say(text));
    }
}

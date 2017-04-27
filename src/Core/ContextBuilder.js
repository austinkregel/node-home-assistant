module.exports = (command) => {
    // Mock thing
    var mock = {
        command: 'order food',
        keywords: [
            'order', '{{ p_noun }}'
        ],
        background() {
            // This should be any kind of "thinking" logic when a match is found for the command.
            // google.maps.search(this.p_noun)
            //     .then(results => {
            //         Mouth.say('I think I found the number for ' + this.p_noun);
            //     })

        },
        variables: {
            p_noun : [
                'dominos'
            ]
        }
    };

}
let Action = require('../Utils/Action')

module.exports = class OrderFood extends Action {
    constructor() {
        super()
        this.description = 'Order you dominos';
        this.addTag('order dominos', {place: [1,1]}, 'order:dominos')
    }

    resolve(place) {
        switch (place) {

        }
    }
}

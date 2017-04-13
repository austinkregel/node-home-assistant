let Action = require('../../Utils/Action')

module.exports = class OrderFood extends Action {
    constructor() {
        super()
        this.description = 'Order you dominos';
        this.addTag('order dominos', {}, 'order:dominos')
    }

    resolve(place) {
        switch (place) {

        }
    }
}

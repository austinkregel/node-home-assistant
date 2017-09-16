const Action = require('../Utils/Action'),
      axios = require('axios');
module.exports = class News extends Action {
    constructor() {
        super()
        this.addTag("what is the news", {news:[3,3]}, 'get:news')
        this.addTag("what's the news", {news: [3,3]}, 'get:news')
        this.addTag("the latest news", {news: [3,3]}, 'get:news')
    }

    resolve() {
        axios.get('https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=' + process.env.NEWS_API)
            .then(res => {
                let text = '',
                    articles = res.data.articles;
                articles.forEach((article,key) => {
                    if(key <= 5) {
                        text += ' ' + (key + 1 )+ ') ' + article.description + '\n\n';
                    }
                    return;
                })

                this.respond(() => {
                    Mouth.say(text)
                }, () => {
                    Mouth.text(text)
                });
            }).catch(res => {
                Log.debug({
                    res
                })
        })
    }
}

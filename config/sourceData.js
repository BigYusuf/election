const axios = require('axios');
const cheerio = require('cheerio');

const sourceData = (url, contentName) => {
   //  url = 'https://www.channelstv.com/'
     //contentName = '.vid_title'
axios(url)
.then(response => {
    const html = response.data
    //console.log(html)
    //lets use cheerio to select the data from the website
    const data = cheerio.load(html)
    const articles = []
    data(`.${contentName}`, html).each(function() {
        const title = data(this).text()
        const mainUrl = data(this).find('a').attr('href')
        articles.push({
            title,
            mainUrl
        })
    })
    console.log(articles)
    return articles
}).catch(err => console.log(err))

}
module.exports = sourceData;
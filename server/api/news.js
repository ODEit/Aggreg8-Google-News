const router = require('express').Router()
const axios = require('axios')
module.exports = router

router.get('/', (req,res,next) =>{
console.log('Hit google news ', process.env.GOOGLE_KEY);
axios.get(`https://newsapi.org/v2/sources?apiKey=${process.env.GOOGLE_KEY}`)
.then((result) => {
     console.log(result.data)
    res.json(result.data)})
.catch(next)
}) 

router.get('/query/:q', (req,res,next)=>{
    console.log('hit the source');
    // console.log("date aksdjaekijkadswaie", Date())
    //Change query string
    axios.get(`https://newsapi.org/v2/everything?q=${req.params.q}&language=en&sortBy=publishedAt&apiKey=${process.env.GOOGLE_KEY}`)
    .then((result) => {
         var articles = result.data.articles
         var nonDup = {}
         articles.forEach( article => {
            nonDup[article.title] ? true: nonDup[article.title] = article 
         })
         articles = [];
         for(let key in nonDup){
             articles.push(nonDup[key])
         }
        res.json(articles.slice(0,10))})
    .catch(next)
})

router.get('/sources/:source', (req,res,next)=>{
    console.log('hit the source');
    axios.get(`https://newsapi.org/v2/top-headlines?sources=${req.params.source}&apiKey=${process.env.GOOGLE_KEY}`)
    .then((result) => {
         console.log("HItting  HERERAESDASLKDQIEJAKSDIJKNEA",Array.isArray(result.data.articles))
        res.json(result.data.articles)})
    .catch(next)
})


const router = require('express').Router()
const axios = require('axios')
module.exports = router

router.get('/', (req,res,next) =>{
console.log('Hit google news ', process.env.GOOGLE_KEY);
axios.get(`https://newsapi.org/v2/top-headlines?sources=al-jazeera-english&apiKey=${process.env.GOOGLE_KEY}`)
.then((result) => {
     console.log(result.data.articles)
    res.json(result.data.articles)})

}) 
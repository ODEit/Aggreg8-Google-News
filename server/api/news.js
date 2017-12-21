const router = require('express').Router()
const axios = require('axios')
module.exports = router

router.get('/', (req,res,next) =>{
console.log('Hit google news ', process.env.GOOGLE_KEY);
axios.get('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=da8ba0459bb04206ac29f7c32630a8dd')
.then((result) => {
     console.log(res.data)
    res.json(result.data)})

}) 
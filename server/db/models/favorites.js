const Sequelize = require('sequelize')

const db = require('../db.js')


/**
 * article.title
 * article.author
 * article.url
 * article.urlToImage ---> imageURL
 * article.description
 */

const Favorite = db.define('favorite',{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageURL: {
        type: Sequelize.STRING,
        defaultValue: 'NoImage.svg.png'
    },
    description: {
        type: Sequelize.TEXT
    }
})

module.exports = Favorite
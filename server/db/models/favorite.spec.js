/**
 * global describe beforeEach it
 */

const { expect } = require('chai');
const db = require('../index');
const Favorites = require('./favorites')
const User = require('./user')

describe('Favorites Model Association with User Model', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })

    describe('Users association instance methods for favorites', () => {
        describe('addFavorites, getFavorites', () => {
            let Users = [
                {
                    email: 'John@Doe.com',
                    passoword: 'john'
                },
                {
                    email: 'Jane@Doe.com',
                    passoword: 'jane'
                }
            ];
            let article = {
                title: 'Check',
                author: 'meowMix',
                url: 'none',
                description: "I LIKE FOOOD OSDOAKSDOEAS"
            }
            let jane, john, janesFavorites, johnsFavorites

            beforeEach(() => {
                return Promise.all(
                    Users.map(user => User.create(user)))
                    .then(async function (user) {
                        user[0].email = 'john@Doe.com' ? [john, jane] = [user[0], user[1]] : [jane, john] = [user[0], user[1]];
                        let favorite = await Favorites.create(article)
                        let favorite2 = await Favorites.create(article)

                        // console.log(favorite.dataValues)
                        await john.addFavorites(favorite)
                        await jane.addFavorites(favorite2)
                        
                        johnsFavorites = await john.getFavorites()
                        
                        // console.log(johnsFavorites[0].dataValues)

                        return
                    })
            })

            it('returns an array', async () => {

                janesFavorites = await jane.getFavorites()

                expect(Array.isArray( janesFavorites )).to.be.equal(true)
            })

            it('array holds an article with all fields', async () => {
                expect(johnsFavorites[0].title).to.be.equal('Check')
                expect(janesFavorites[0].author).to.be.equal('meowMix')
                expect(janesFavorites[0].url).to.be.equal('none')
                expect(janesFavorites[0].imageURL).to.be.equal('NoImage.svg.png')
                expect(janesFavorites[0].description).to.be.equal('I LIKE FOOOD OSDOAKSDOEAS')
            })
        })
    })
})


/**
 * article.title
 * article.author
 * article.url
 * article.urlToImage ---> imageURL
 * article.description
 */

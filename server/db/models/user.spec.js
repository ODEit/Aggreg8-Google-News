/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('instanceMethods', () => {
    describe('correctPassword, addFriends, getFriends', () => {
      let Users = [
        {
          email: "John@Doe.com",
          password: "john"
        },
        {
          email: "Jane@Doe.com",
          password: "jane"
        }
      ];
      let jane, john, friend
      beforeEach(() => {
        return Promise.all(
          Users.map(user => User.create(user)))
          .then(async function (user) {
            user[0].email = 'john@Doe.com' ? [john, jane] = [user[0], user[1]] : [john, jane] = [user[1], user[0]]
            friend = await john.addFriends(jane)
            friend = await john.getFriends()
            
            return friend
          })
      })

      it('returns true if the password is correct', () => {
        expect(jane.correctPassword('jane')).to.be.equal(true)
      })

      it('returns an array', () => {
        expect(Array.isArray(friend)).to.be.equal(true)
      })

      it('returns an array of john"s friends', () => {
        expect(friend[0].email).to.be.equal('Jane@Doe.com')
      })

    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')

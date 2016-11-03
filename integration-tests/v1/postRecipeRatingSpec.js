const { expect } = require('chai')
const request = require('supertest')

const { bootServer } = require('../../app/app')
const recipes = require('./_mockRecipes')

describe('POST /v1/recipes/:id/rating', function () {
  before(function () {
    this.server = bootServer({}, recipes).app
    this.request = request(this.server)
    // I just want a random recipe from all available
    this.randomRecipe = recipes[Math.floor(Math.random() * recipes.length)]
  })

  it('should be able to add a rating with result:success', function (done) {
    let fakeRating = { rating: 2 }
    this.request.post('/v1/recipes/' + this.randomRecipe.id + '/ratings')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(fakeRating))
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { return done(err) }
        expect(res.body.result).to.equal('success')
      })
    this.request.get('/v1/recipes/' + this.randomRecipe.id)
      .end((err, res) => {
        if (err) { return done(err) }
        let rating = res.body.data.recipe.rating
        expect(rating).to.have.lengthOf(1)
        expect(rating[0]).to.equal(fakeRating.rating)
        done()
      })
  })

  it('should be able to add another rating with result:success', function (done) {
    let fakeRating = { rating: 4 }
    this.request.post('/v1/recipes/' + this.randomRecipe.id + '/ratings')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(fakeRating))
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { return done(err) }
        expect(res.body.result).to.equal('success')
      })
    this.request.get('/v1/recipes/' + this.randomRecipe.id)
      .end((err, res) => {
        if (err) { return done(err) }
        let rating = res.body.data.recipe.rating
        expect(rating).to.have.lengthOf(2)
        expect(rating[1]).to.equal(fakeRating.rating)
        done()
      })
  })
})

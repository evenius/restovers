const { expect } = require('chai')
const request = require('supertest')

const { bootServer } = require('../../app/app')
const recipes = require('./_mockRecipes')

describe('PATCH /v1/recipes/:id', function () {
  before(function () {
    this.server = bootServer({}, recipes).app
    this.request = request(this.server)
    // I just want a random recipe from all available
    this.randomRecipe = recipes[Math.floor(Math.random() * recipes.length)]
  })
  it('should be able to patch a recipe', function (done) {
    let coolNewTitle = 'blorglurgl'
    this.request.get('/v1/recipes/' + this.randomRecipe.id)
      .end((err, res) => {
        if (err) { return done(err) }
        this.request.patch('/v1/recipes/' + this.randomRecipe.id)
          .set('Content-Type', 'application/json')
          .send(JSON.stringify({ recipe: { title: coolNewTitle } }))
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) { return done(err) }
            expect(res.body.result).to.equal('success')
            done()
          })
      })
  })
  it('should gracefully return 404 with result:error', function (done) {
    // Fetch a recipe with one higher id than available
    this.request.get('/v1/recipes/' + recipes.length + 1)
      .expect(404)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { return done(err) }
        expect(res.body.result).to.equal('error')
        expect(res.body.data).to.be.empty
        expect(res.body.error).to.equal('Unable to find resource')
        done()
      })
  })
})

const { expect } = require('chai')
const request = require('supertest')

const { bootServer } = require('../../app/app')
const recipes = require('./_mockRecipes')

describe('POST /v1/recipes', function () {
  before(function () {
    this.server = bootServer({}, recipes).app
    this.request = request(this.server)
  })

  it('should successfully add a new recipe to the collection with a result:success', function (done) {
    let newRecipe = {'title': 'Noobly gnorbles', 'short_title': 'gnorbles', 'protein_grams': 13}

    this.request.post('/v1/recipes')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify({recipe: newRecipe}))
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) { return done(err) }
      expect(res.body.result).to.equal('success')
      done()
    })
  })
  it('should return 400 with result:error', function (done) {
    let newRecipe = {}
    // Fetch a recipe with one higher id than available
    this.request.post('/v1/recipes/')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({recipe: newRecipe}))
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { return done(err) }
        expect(res.body.result).to.equal('error')
        expect(res.body.data).to.be.empty
        // expect(res.body.error).to.equal('Unable to find resource')
        done()
      })
  })
})

const { expect } = require('chai')
const request = require('supertest')
const URL = require('url')

const { bootServer } = require('../../app/app')
const recipes = require('./_mockRecipes')

describe('GET /v1/recipes', function () {
  before(function () {
    this.server = bootServer({}, recipes).app
    this.request = request(this.server)
  })
  it('should successfully return a list of recipes with result:success', function (done) {
    // Construct request
    this.request.get('/v1/recipes')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) { return done(err) }
        // Assert response
        expect(res.body.data.recipes).to.not.be.empty
        expect(res.body.result).to.equal('success')
        return done()
      })
  })

  it('should be able to return exactly 5 recipes', function (done) {
    // Construct request
    this.request.get('/v1/recipes')
      .query({limit: 5})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) { return done(err) }
        // Assert response
        expect(res.body.data.recipes).to.have.lengthOf(5)
        return done()
      })
  })

  it('should be able to filter on cuisine', function (done) {
    let recipesWithCuisine = recipes.filter(recipe => recipe.recipe_cuisine)
    let randomRecipe = recipesWithCuisine[Math.floor(Math.random() * recipesWithCuisine.length)]

    this.request.get('/v1/recipes')
      .query({recipe_cuisine: randomRecipe.recipe_cuisine})
      .query({limit: recipes.length})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) { return done(err) }
        let responseRecipes = res.body.data.recipes

        let expectedLength = recipesWithCuisine.filter(r => r.recipe_cuisine === randomRecipe.recipe_cuisine).length
        let respondedNonMatching = responseRecipes.filter(r => r.recipe_cuisine !== randomRecipe.recipe_cuisine)

        // Assert response
        expect(responseRecipes).to.have.lengthOf(expectedLength)
        expect(respondedNonMatching).to.have.lengthOf(0)
        return done()
      })
  })

  it('should be able to paginate back and forth', function (done) {
    const request = this.request
    // Construct first request
    request.get('/v1/recipes')
      .expect(200)
      .end(function (err, res) {
        if (err) { return done(err) }
        let nextPage = URL.parse(res.body.paging.next)
        let firstPageRecipes = res.body.data.recipes

        // Continue deeper, follow the paging.next link!
        request.get(nextPage.path)
          .expect(200)
          .end(function (err, res) {
            if (err) { return done(err) }
            let prevPage = URL.parse(res.body.paging.prev)
            let secondPageRecipes = res.body.data.recipes

            // How far does this rabbithole go?
            request.get(prevPage.path)
              .expect(200)
              .end(function (err, res) {
                if (err) { return done(err) }
                expect(secondPageRecipes).to.not.deep.equal(firstPageRecipes)
                expect(res.body.data.recipes).to.deep.equal(firstPageRecipes)
                return done()
              })
          })
      })
  })

  it('should send me an empty list when I am waay out of range. Still a result:succes', function (done) {
    this.request.get('/v1/recipes')
    .query({from: 99})
    .expect(200)
    .end(function (err, res) {
      if (err) { return done(err) }
      expect(res.body.data.recipes).to.be.empty
      expect(res.body.result).to.equal('success')
      return done()
    })
  })
})

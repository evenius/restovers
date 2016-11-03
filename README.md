# Restovers
 _A simple recipe-API_

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Notes from the... Author](#notes-from-the-author)
	- [Why I chose node/express](#why-i-chose-nodeexpress)
	- [Catering to different consumers](#catering-to-different-consumers)
	- [Other notes](#other-notes)
- [How to run](#how-to-run)
- [Available commands](#available-commands)
- [How to consume](#how-to-consume)
	- [Requests](#requests)
	- [`GET /v1/recipes`](#get-v1recipes)
	- [`POST /v1/recipes`](#post-v1recipes)
	- [`GET /v1/recipes/:id`](#get-v1recipesid)
	- [`PATCH /v1/recipes/:id`](#patch-v1recipesid)
	- [`POST /v1/recipes/:id/ratings`](#post-v1recipesidratings)
	- [Responses](#responses)
	- [`RecipeListResponse`](#recipelistresponse)
	- [`OneRecipeResponse`](#onereciperesponse)
	- [`WroteDataResponse`](#wrotedataresponse)
	- [`ErrorResponse`](#errorresponse)
	- [`ErrorNotFoundResponse`](#errornotfoundresponse)
	- [`ErrorValidationResponse`](#errorvalidationresponse)

<!-- /TOC -->

## Notes from the... Author
### Why I chose node/express
Partly because a highly functional language like javascript highly lends itself to testing, and partly because between this and PHP, this happened to be more suited to the limited scope of the assignment

### Catering to different consumers
I _would_ work from [Postel's law](https://en.wikipedia.org/wiki/Robustness_principle) and implement a more reasonable validation/defaultData-schema, whilst opening up for returning more datatypes depending on the consumer's `Accept`, etc.
I would also completely steal Facebook's GraphQL, so the consumer can choose to maybe only receive slugs when fetching a whole list of recipe.

### Other notes
If I did for 'real', I would probably write integration tests straight up in swagger, and use their api documenting software, especially now after their OpenAPI-initiative

## How to run

 1. Run `npm install`
 2. Run `npm start`

## Available commands
  - `npm install` -Install all packaged files
  - `npm test` - Runs all available tests
    - `npm run test:code` - Runs all, um, mocha tests
    - `npm run test:unit` - Runs all unit tests
    - `npm run test:integration` - Runs all integration tests
    - `npm run test:lint` - Runs linter

## How to consume

All requests takes and returns `Content-Type: application/json`, and follows the REST standard in general

### Requests
### `GET /v1/recipes`
Find a list of recipes

**Query**:

    limit: (int) 'number of recipes expected to receive'
    from: (int) 'return recipes from this position in list'

    slug: (string) filter recipes by 'slug'
    title: (string) filter recipes by 'title'
    short_title: (string) filter recipes by 'short_title'
    shelf_life_days: (int) filter recipes by 'shelf_life_days'
    equipment_needed: (string) filter recipes by 'equipment_needed'
    recipe_diet_type_id: (string) filter recipes by 'recipe_diet_type_id'
    marketing_description: (string) filter recipes by 'marketing_description'

    season: (string) filter recipes by 'season'
    box_type: (string) filter recipes by 'box_type'
    fat_grams: (int) filter recipes by 'fat_grams'
    carbs_grams: (int) filter recipes by 'carbs_grams'
    calories_kcal: (int) filter recipes by 'calories_kcal'
    protein_grams: (int) filter recipes by 'protein_grams'
    origin_country: (string) filter recipes by 'origin_country'
    recipe_cuisine: (string) filter recipes by 'recipe_cuisine'

    base: (string) filter recipes by 'base'
    protein_source: (string) filter recipes by 'protein_source'
    preparation_time_minutes: (int) filter recipes by 'preparation_time_minutes'

    in_your_box: (string) filter recipes by 'in_your_box'
    gousto_reference: (int) filter recipes by 'gousto_reference'

**Returns**:
- [`RecipeListResponse`](#recipelistresponse)
- [`ErrorResponse`](#errorresponse)

### `POST /v1/recipes`
Post a new recipe

**Body**:

    slug: (string) filter recipes by 'slug'
    title: (string) filter recipes by 'title'
    short_title: (string) filter recipes by 'short_title'
    shelf_life_days: (int) filter recipes by 'shelf_life_days'
    equipment_needed: (string) filter recipes by 'equipment_needed'
    recipe_diet_type_id: (string) filter recipes by 'recipe_diet_type_id'
    marketing_description: (string) filter recipes by 'marketing_description'

    season: (string) filter recipes by 'season'
    box_type: (string) filter recipes by 'box_type'
    fat_grams: (int) filter recipes by 'fat_grams'
    carbs_grams: (int) filter recipes by 'carbs_grams'
    calories_kcal: (int) filter recipes by 'calories_kcal'
    protein_grams: (int) filter recipes by 'protein_grams'
    origin_country: (string) filter recipes by 'origin_country'
    recipe_cuisine: (string) filter recipes by 'recipe_cuisine'

    base: (string) filter recipes by 'base'
    protein_source: (string) filter recipes by 'protein_source'
    preparation_time_minutes: (int) filter recipes by 'preparation_time_minutes'

    in_your_box: (string) filter recipes by 'in_your_box'
    gousto_reference: (int) filter recipes by 'gousto_reference'`

**Returns**:
- [`WroteDataResponse`](#wrotedataresponse)
- [`ErrorNotFoundResponse`](#errornotfoundresponse)
- [`ErrorValidationResponse`](#errorvalidationresponse)
- [`ErrorBadRequest`](#errorvalidationresponse)

### `GET /v1/recipes/:id`
  Get one single recipe and all that it entails
  **Returns**:
  - [`OneRecipeResponse`](#wrotedataresponse)
  - [`ErrorNotFoundResponse`](#errornotfoundresponse)

### `PATCH /v1/recipes/:id`
Patch an existing recipe with new data

**Body**:

    slug: (string) filter recipes by 'slug'
    title: (string) filter recipes by 'title'
    short_title: (string) filter recipes by 'short_title'
    shelf_life_days: (int) filter recipes by 'shelf_life_days'
    equipment_needed: (string) filter recipes by 'equipment_needed'
    recipe_diet_type_id: (string) filter recipes by 'recipe_diet_type_id'
    marketing_description: (string) filter recipes by 'marketing_description'

    season: (string) filter recipes by 'season'
    box_type: (string) filter recipes by 'box_type'
    fat_grams: (int) filter recipes by 'fat_grams'
    carbs_grams: (int) filter recipes by 'carbs_grams'
    calories_kcal: (int) filter recipes by 'calories_kcal'
    protein_grams: (int) filter recipes by 'protein_grams'
    origin_country: (string) filter recipes by 'origin_country'
    recipe_cuisine: (string) filter recipes by 'recipe_cuisine'

    base: (string) filter recipes by 'base'
    protein_source: (string) filter recipes by 'protein_source'
    preparation_time_minutes: (int) filter recipes by 'preparation_time_minutes'

    in_your_box: (string) filter recipes by 'in_your_box'
    gousto_reference: (int) filter recipes by 'gousto_reference'`

**Returns**:
- [`WroteDataResponse`](#wrotedataresponse)
- [`ErrorNotFoundResponse`](#errornotfoundresponse)
- [`ErrorValidationResponse`](#errorvalidationresponse)
- [`ErrorBadRequest`](#errorvalidationresponse)

### `POST /v1/recipes/:id/ratings`

Patch an existing recipe with new data

**Body**:

    rating: (int) A rating between 1 and 5 to append to associate with a recipe

**Returns**:
- [`WroteDataResponse`](#wrotedataresponse)
- [`ErrorNotFoundResponse`](#errornotfoundresponse)
- [`ErrorValidationResponse`](#errorvalidationresponse)
- [`ErrorBadRequest`](#errorvalidationresponse)

### Responses
### `RecipeListResponse`
```javascript
{
  status: "success",
  data: {recipes: []} // Array of recipes, see `OneRecipeResponse`
}
```
### `OneRecipeResponse`
```javascript
{
  status: "success",
  data: {recipe: {
    "slug": "(string)",
    "title": "(string)",
    "short_title": "(string)",
    "shelf_life_days": "(int)",
    "equipment_needed": "(string)",
    "recipe_diet_type_id": "(string)",
    "marketing_description": "(string)",

    "season": "(string)",
    "box_type": "(string)",
    "fat_grams": "(int)",
    "carbs_grams": "(int)",
    "calories_kcal": "(int)",
    "protein_grams": "(int)",
    "origin_country": "(string)",
    "recipe_cuisine": "(string)",

    "base": "(string)",
    "protein_source": "(string)",
    "preparation_time_minutes": "(int)",

    "in_your_box": "(string)",
    "gousto_reference": "(int)"
}}
}
```
### `WroteDataResponse`
```javascript
{
  status: "success",
  data: 'ok'
}
```
### `ErrorResponse`
```javascript
{
  status: "error",
  data: {}, // empty object
  message: '(string)'
}
```
### `ErrorNotFoundResponse`
```javascript
{
  status: "error",
  data: {}, // empty object
  message: '(string)'
}
```
### `ErrorValidationResponse`
```javascript
{
  status: "error",
  data: {}, // empty object
  message: '(object)' // Object with keys where validation failed
}
```

const slug = require('slug')
const moment = require('moment')

const RecipeSchema = {
  'id': {numericality: true, unique: 'increments'},
  'title': {presence: true},
  'short_title': {presence: true},
  'bulletpoint1': {},
  'bulletpoint2': {},
  'bulletpoint3': {},
  'marketing_description': {},

  'gousto_reference': {numericality: true},
  'in_your_box': {},
  'shelf_life_days': {numericality: true},
  'slug': {defaultVal: (recipe) => slug(recipe.short_title || '')},
  'box_type': {},

  'base': {},
  'season': {},
  'protein_source': {},
  'origin_country': {},
  'recipe_cuisine': {},
  'equipment_needed': {},
  'recipe_diet_type_id': {},
  'preparation_time_minutes': {numericality: true},

  'fat_grams': {numericality: true},
  'carbs_grams': {numericality: true},
  'protein_grams': {numericality: true},
  'calories_kcal': {numericality: true},

  'rating': {iterator: true},

  'created_at': {defaultVal: () => moment()},
  'updated_at': {defaultVal: () => moment()}
}

module.exports = RecipeSchema

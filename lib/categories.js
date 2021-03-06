topCategories = [
  {
    label: 'Muebles',
    value: 'muebles'
  },
  {
    label: 'Pisos & Revestimientos',
    value: 'pisos-revestimientos'
  },
  {
    label: 'Decoración',
    value: 'decoracion'
  },
  {
    label: 'Iluminación',
    value: 'iluminacion'
  },
  {
    label: 'Exterior',
    value: 'exterior'
  },
  {
    label: 'Baños',
    value: 'banos'
  },
  {
    label: 'Cocina',
    value: 'cocina'
  },
  {
    label: 'Infantil',
    value: 'infantil'
  }
];

getSubcategories = function(category) {
  var item = _.findWhere(topCategories, { value: category });
  var items = Categories.find({ category: item.label }, { sort: { subcategory: 1 } }).fetch();
  return _.compact(_.uniq(_.pluck(items, 'subcategory')));
}

getTypes = function(category, subcategory) {
  var category = _.findWhere(topCategories, { value: category }).label;
  return Categories.find({ category: category, subcategory: subcategory }, { sort: { type: 1 } }).fetch();
}

getFirstTypeIdWithCategory = function(category) {
  var item = _.findWhere(topCategories, { value: category });
  var category = Categories.findOne({ category: item.label });
  return category && category._id;
}

if (Meteor.isClient) {
  Template.registerHelper('topCategories', function() {
    return topCategories;
  })
}

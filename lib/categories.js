topCategories = [
  {
    label: 'Muebles',
    value: 'muebles'
  },
  {
    label: 'Pisos',
    value: 'pisos'
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
    label: 'Baños',
    value: 'banos'
  },
  {
    label: 'Cocina',
    value: 'cocina'
  },
  {
    label: 'Textil',
    value: 'textil'
  }
];

getSubcategories = function(category) {
  var item = _.findWhere(topCategories, { value: category });
  var items = Categories.find({ category: item.label }).fetch();
  return _.compact(_.uniq(_.pluck(items, 'subcategory')));
}

getTypes = function(category, subcategory) {
  var category = _.findWhere(topCategories, { value: category }).label;
  return Categories.find({ category: category, subcategory: subcategory }).fetch();
}

if (Meteor.isClient) {
  Template.registerHelper('topCategories', function() {
    return topCategories;
  })
}
Meteor.publish('categories', function(value) {
  check(value, String);
  var item = _.findWhere(topCategories, { value: value });
  return Categories.find({ category: item.label });
})

Meteor.publish('categoryProducts', function(level1, level2) {
  check(level1, String);
  check(level2, Match.Optional(Array));
  var categories;

  if (level2) {
    categories = _.pluck(Categories.find({ level1: level1, level2: { $in: level2 } }).fetch(), '_id');
  } else {
    categories = _.pluck(Categories.find({ level1: level1 }).fetch(), '_id');
  }
  
  return Products.find({ category: { $in: categories } });
})
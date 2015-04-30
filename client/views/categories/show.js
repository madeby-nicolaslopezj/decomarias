Template.categoriesShow.onRendered(function() {
  this.subscribe('categories', Router.current().params.value);
  this.$('.parallax').parallax();
  this.autorun(function() {
    if (Categories.find().count()) {
      Tracker.afterFlush(function () {
        $('ul.tabs').tabs();
      });
    }
  })
})

Template.categoriesShow.helpers({
  currentCategory: function() {
    var current = _.findWhere(topCategories, { value: Router.current().params.value });
    current.image = orion.dictionary.get('images.' + current.value);
    return current;
  },
  subcategories: function() {
    var item = _.findWhere(topCategories, { value: Router.current().params.value });
    var items = Categories.find({ category: item.label }).fetch();
    return _.compact(_.uniq(_.pluck(items, 'subcategory')));
  },
  categories: function() {
    var item = _.findWhere(topCategories, { value: Router.current().params.value });
    return Categories.find({ category: item.label });
  }
});
Template.productsCategories.onRendered(function() {
  var self = this;

  self.autorun(function() {
    if (getLevel1Categories()) {
      Tracker.afterFlush(function () {
        $('ul.tabs').tabs();
        Session.set('level1Category', getLevel1Categories()[0]);
        var childs = _.compact(_.uniq(_.pluck(Categories.find({ level1: getLevel1Categories()[0] }).fetch(), 'level2')));
        Session.set('categoryActiveChilds', childs);
        $('ul.tabs').tabs('select_tab', getLevel1Categories()[0]);
      });
    }
  })

  self.autorun(function(){
    self.subscribe('categoryProducts', Session.get('level1Category'), Session.get('categoryActiveChilds'));
  })
})

Template.productsCategories.helpers({
  categories: function () {
    return getLevel1Categories();
  },
  childCategories: function() {
    var level1 = Session.get('level1Category');
    var categories = _.compact(_.uniq(_.pluck(Categories.find({ level1: level1 }).fetch(), 'level2')));
    return categories;
  },
  isChildActive: function() {
    return _.contains(Session.get('categoryActiveChilds'), String(this));
  },
  category: function() {
    return Session.get('level1Category');
  },
  products: function() {
    var level1 = Session.get('level1Category');
    var categories = _.pluck(Categories.find({ level1: level1 }).fetch(), '_id');
    return Products.find({ category: { $in: categories } });
  },
  productsCount: function() {
    var level1 = Session.get('level1Category');
    var categories = _.pluck(Categories.find({ level1: level1 }).fetch(), '_id');
    return Products.find({ category: { $in: categories } }).count();
  }
});

Template.productsCategories.events({
  'click ul.tabs a': function (event) {
    var category = $(event.currentTarget).attr('category');
    Session.set('level1Category', category);
    var childs = _.compact(_.uniq(_.pluck(Categories.find({ level1: category }).fetch(), 'level2')));
    Session.set('categoryActiveChilds', childs);
  },
  'click .child-category-box input': function(event, template) {
    var active = [];
    template.$('.child-category-box input:checked').each(function() {
      active.push($(this).attr('category'));
    })
    Session.set('categoryActiveChilds', active);
  }
});






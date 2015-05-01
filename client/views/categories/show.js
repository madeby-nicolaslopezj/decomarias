Template.categoriesShow.onRendered(function() {
  var self = this;
  self.subscribe('categories', Router.current().params.value);
  self.$('.parallax').parallax();
  self.autorun(function() {
    if (getSubcategories(Router.current().params.value).length > 0) {
      Tracker.afterFlush(function () {
        Session.set('currentSubcategory', getSubcategories(Router.current().params.value)[0]);
        var types = _.pluck(getTypes(Router.current().params.value, Session.get('currentSubcategory')), '_id');
        Session.set('selectedTypes', types);
        $('ul.tabs').tabs();
      });
    }
  })

  self.autorun(function() {
    var ids = Session.get('selectedTypes');
    if (!ids) {
      return;
    }
    self.subscribe('productsByCategory', ids);
  })

  var container = document.querySelector('.masonry');
  var msnry = new Masonry(container, { itemSelector: '.col' });
  self.autorun(function() {
    Products.find().count();
    Tracker.afterFlush(function () {
      var msnry = new Masonry(container, { itemSelector: '.col' });
      $('.masonry .col').imagesLoaded()
      .progress(function() {
        var msnry = new Masonry(container, { itemSelector: '.col' });
      })
    });
  })
})

Template.categoriesShow.helpers({
  shouldShowTabs: function() {
    return getSubcategories(Router.current().params.value).length > 1;
  },
  currentCategory: function() {
    var current = _.findWhere(topCategories, { value: Router.current().params.value });
    current.image = orion.dictionary.get('images.' + current.value);
    return current;
  },
  availableTypes: function() {
    return getTypes(Router.current().params.value, Session.get('currentSubcategory'));
  },
  isTypeSelected: function() {
    return _.contains(Session.get('selectedTypes'), this._id);
  },
  subcategories: function() {
    return getSubcategories(Router.current().params.value)
  },
  categories: function() {
    var item = _.findWhere(topCategories, { value: Router.current().params.value });
    return Categories.find({ category: item.label });
  },
  products: function() {
    var ids = Session.get('selectedTypes');
    return Products.find({ category: { $in: ids } });
  }
});

Template.categoriesShow.events({
  'click ul.tabs a': function () {
    Session.set('currentSubcategory', String(this))
    var types = _.pluck(getTypes(Router.current().params.value, Session.get('currentSubcategory')), '_id');
    Session.set('selectedTypes', types);
  },
  'click .child-category-box input': function() {
    if (_.contains(Session.get('selectedTypes'), this._id)) {
      Session.set('selectedTypes', _.without(Session.get('selectedTypes'), this._id))
    } else {
      var types = Session.get('selectedTypes');
      types.push(this._id);
      Session.set('selectedTypes', types)
    }
  }
});
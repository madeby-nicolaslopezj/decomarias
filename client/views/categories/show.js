Template.categoriesShow.onCreated(function () {
  var self = this;
  self.autorun(function () {
    self.subscribe('categories', Router.current().params.value);
  });
  self.autorun(function() {
    var id = Router.current().params.type || '';
    self.subscribe('productsByCategory', id);
  })
});

Template.categoriesShow.onRendered(function() {
  var self = this;
  $('.parallax').parallax();
  $('.dropdown-button').dropdown({ constrain_width: false });

  self.autorun(function() {
    if (!Router.current().params.type) {
      Router.current().params.type = getFirstTypeIdWithCategory(Router.current().params.value);
      Router.go('categories.show', Router.current().params, { replaceState: true });
    }
  })

  self.autorun(function() {
    if (!Template.instance().subscriptionsReady()) return;

    var container = document.querySelector('.masonry');
    var msnry = new Masonry(container, { itemSelector: '.col' });
    var id = Router.current().params.type || '';
    Products.find({ category: id }).count();
    Tracker.afterFlush(function () {
      $('.dropdown-button').dropdown({ constrain_width: false });
      var msnry = new Masonry(container, { itemSelector: '.col' });
      $('img[data-original]').lazyload({
        effect: 'fadeIn'
      });
    });
  })
})

Template.categoriesShow.helpers({
  shouldShowTabs: function() {
    return getSubcategories(Router.current().params.value).length > 1;
  },
  getImageHeight: function() {
    rwindow.$width()
    var info = this.image.info;
    var colWidth = $('.example-width').width();
    var finalHeight = (info.height * colWidth) / info.width;
    return finalHeight;
  },
  currentCategory: function() {
    var current = _.findWhere(topCategories, { value: Router.current().params.value });
    current.image = orion.dictionary.get('images.' + current.value);
    return current;
  },
  types: function() {
    return getTypes(Router.current().params.value, String(this));
  },
  subcategories: function() {
    return getSubcategories(Router.current().params.value)
  },
  categories: function() {
    var item = _.findWhere(topCategories, { value: Router.current().params.value });
    return Categories.find({ category: item.label });
  },
  products: function() {
    var id = Router.current().params.type || '';
    var withPrice = Products.find({ category: id, price: { $ne: null }}, { sort: { price: 1 } }).fetch()
    var withoutPrice = Products.find({ category: id, price: null }, { sort: { price: 1 } }).fetch()
    return _.union(withPrice, withoutPrice);
  },
  getIdForSubcategory: function() {
    return String(this).toLowerCase().replace(/\s+/g, '');
  },
  getCurrentType: function() {
    return Categories.findOne(Router.current().params.type);
  }
});

Template.categoriesShow.events({

});

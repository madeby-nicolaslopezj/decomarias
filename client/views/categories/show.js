Template.categoriesShow.onCreated(function () {
  var self = this;
  self.autorun(function () {
    self.subscribe('categories', Router.current().params.value);
  });
  self.autorun(function() {
    var ids = Session.get('selectedTypes') || [];
    self.subscribe('productsByCategory', ids);
  })
});

Template.categoriesShow.onRendered(function() {
  var self = this;
  self.$('.parallax').parallax();

  Session.set('currentSubcategory', getSubcategories(Router.current().params.value)[0]);
  var types = _.pluck(getTypes(Router.current().params.value, Session.get('currentSubcategory')), '_id');
  Session.set('selectedTypes', types);

  self.autorun(function() {
    if (!Template.instance().subscriptionsReady()) return;

    if (getSubcategories(Router.current().params.value).length > 0) {
      Tracker.afterFlush(function () {
        if (!Session.get('currentSubcategory')) {
          Session.set('currentSubcategory', getSubcategories(Router.current().params.value)[0]);
          var types = _.pluck(getTypes(Router.current().params.value, Session.get('currentSubcategory')), '_id');
          Session.set('selectedTypes', types);
        }
        Meteor.setTimeout(function () {
          Session.set('docMinHeight', 0);
        }, 300);
      });
    }
  })


  self.autorun(function() {
    if (!Template.instance().subscriptionsReady()) return;

    var container = document.querySelector('.masonry');
    var msnry = new Masonry(container, { itemSelector: '.col' });
    var ids = Session.get('selectedTypes') || [];
    Products.find({ category: { $in: ids } }).count();
    Tracker.afterFlush(function () {
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
  availableTypes: function() {
    return getTypes(Router.current().params.value, Session.get('currentSubcategory'));
  },
  availablePrices: function() {
    return Session.get('availablePrices');
  },
  isTypeSelected: function() {
    return _.contains(Session.get('selectedTypes'), this._id);
  },
  isPriceSelected: function() {
    return Session.get('selectedPrices') && _.contains(Session.get('selectedPrices'), this.identifier);
  },
  subcategories: function() {
    return getSubcategories(Router.current().params.value)
  },
  categories: function() {
    var item = _.findWhere(topCategories, { value: Router.current().params.value });
    return Categories.find({ category: item.label });
  },
  products: function() {
    var ids = Session.get('selectedTypes') || [];
    var withPrice = Products.find({ category: { $in: ids }, price: { $ne: null }}, { sort: { price: 1 } }).fetch()
    var withoutPrice = Products.find({ category: { $in: ids }, price: null}, { sort: { price: 1 } }).fetch()
    return _.union(withPrice, withoutPrice);
  },
  getDocMinHeight: function() {
    return Session.get('docMinHeight');
  },
  isSubcategoryActive: function() {
    return Session.get('currentSubcategory') == String(this) && 'active';
  }
});

Template.categoriesShow.events({
  'click .tabs-container a': function () {
    Session.set('docMinHeight', $(document).height());
    Session.set('currentSubcategory', String(this))
    var types = _.pluck(getTypes(Router.current().params.value, Session.get('currentSubcategory')), '_id');
    Session.set('selectedTypes', types);
  },
  'click .types input': function() {
    if (_.contains(Session.get('selectedTypes'), this._id)) {
      Session.set('selectedTypes', _.without(Session.get('selectedTypes'), this._id))
    } else {
      var types = Session.get('selectedTypes');
      types.push(this._id);
      Session.set('selectedTypes', types)
    }
  },
  'click .prices input': function() {
    if (_.contains(Session.get('selectedPrices'), this.identifier)) {
      Session.set('selectedPrices', _.without(Session.get('selectedPrices'), this.identifier))
    } else {
      var prices = Session.get('selectedPrices');
      prices.push(this.identifier);
      Session.set('selectedPrices', prices);
    }
  }
});

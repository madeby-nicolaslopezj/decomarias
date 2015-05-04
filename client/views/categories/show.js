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

  self.autorun(function() {
    var numOptions = 3;
    var ids = Session.get('selectedTypes');
    if (Products.find({ category: { $in: ids } }).count() == 0) return;
    var min = Products.findOne({ category: { $in: ids } }, { sort: { price: 1 } }).price;
    var max = Products.findOne({ category: { $in: ids } }, { sort: { price: -1 } }).price;
    var diff = Math.ceil((max - min) / numOptions); 
    var prices = _.range(min, max, diff);
    var selected = [];
    Session.set('availablePrices', prices.map(function(item) {
      selected.push(item + '');
      var priceMin = Math.floor(item * 0.001) * 1000;
      var priceMax = Math.ceil((item + diff) * 0.001) * 1000;
      return {
        label: '$' + numberFormat(priceMin) + ' - $' + numberFormat(priceMax),
        min: priceMin,
        max: priceMax,
        identifier: item + ''
      }
    }));
    Session.set('selectedPrices', selected);
  })

  var container = document.querySelector('.masonry');
  var msnry = new Masonry(container, { itemSelector: '.col' });
  self.autorun(function() {

    var ids = Session.get('selectedTypes');
    var prices = [];
    Session.get('selectedPrices').map(function (number) {
      var price = _.findWhere(Session.get('availablePrices'), { identifier: number });
      prices.push({ price: { $gte: price.min, $lte: price.max } });
    });
    Products.find({ category: { $in: ids }, $or: prices }).count();

    Tracker.afterFlush(function () {
      var msnry = new Masonry(container, { itemSelector: '.col' });
      $('.masonry .col').each(function(index, val) {
        $(this).imagesLoaded()
          .always(function() {
            var msnry = new Masonry(container, { itemSelector: '.col' });
          })
      });
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
    var ids = Session.get('selectedTypes');

    if (!Session.get('selectedPrices')) {
      return Products.find({ category: { $in: ids }});
    }

    var prices = [];
    Session.get('selectedPrices').map(function (number) {
      var price = _.findWhere(Session.get('availablePrices'), { identifier: number });
      prices.push({ price: { $gte: price.min, $lte: price.max } });
    });
    return Products.find({ category: { $in: ids }, $or: prices });
  }
});

Template.categoriesShow.events({
  'click ul.tabs a': function () {
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
Template.search.onRendered(function() {

  var self = this;
  var container = document.querySelector('.masonry');

  var remason = function() {
    var doR = function() {
      var msnry = new Masonry(container, { itemSelector: '.col' });
      $('img[data-original]:not([src])').lazyload({
        effect: 'fadeIn',
        placeholder: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      });
    };
    Meteor.setTimeout(doR, 10);
    Meteor.setTimeout(doR, 100);
    Meteor.setTimeout(doR, 500);
  };

  self.autorun(function() {
    ProductsIndex.config.mongoCollection.find().fetch();
    StoresIndex.config.mongoCollection.find().fetch();
    Tracker.afterFlush(function () {
      remason();
    });
  });
});

Template.search.helpers({
  searchIndexes: () => [ProductsIndex, StoresIndex],
  ProductsIndex: () => ProductsIndex,
  StoresIndex: () => StoresIndex,
  btnAttrs: function() {
    return { class: 'btn' };
  },
  inputAttrs: function() {
    return { type: 'search', id: 'search' };
  },
  getImageHeight: function () {
    rwindow.$width()
    var info = (this.image || this.logo || {}).info;
    if (!info) return 0;
    var colWidth = $('.example-width').width();
    var finalHeight = (info.height * colWidth) / info.width;
    return finalHeight;
  }
});

Template.search.events({
  'keyup #search': function(event, template) {
    ProductsIndex.getComponentMethods().search(event.currentTarget.value);
    StoresIndex.getComponentMethods().search(event.currentTarget.value);
  }
});

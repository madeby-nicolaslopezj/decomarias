Template.storesShow.onRendered(function() {
  var self = this;
  self.subscribe('store', Router.current().params._id);

  var container = document.querySelector('.masonry');
  var msnry = new Masonry(container, { itemSelector: '.col' });
  self.autorun(function() {
     Products.find({ storeId: Router.current().params._id }).count();
    Tracker.afterFlush(function () {
      var msnry = new Masonry(container, { itemSelector: '.col' });
      $('.masonry .col').imagesLoaded()
        .always(function() {
          var msnry = new Masonry(container, { itemSelector: '.col' });
        })
    });
  })
})

Template.storesShow.helpers({
  store: function () {
    return Stores.findOne(Router.current().params._id)
  },
  products: function() {
    return Products.find({ storeId: Router.current().params._id });
  }
});
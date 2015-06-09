Template.storesShow.onCreated(function () {
  var self = this;
  self.autorun(function () {
    self.subscribe("store", Router.current().params._id);
  });
});

Template.storesShow.onRendered(function() {
  var self = this;
  self.autorun(function() {
    if (!Template.instance().subscriptionsReady()) return;

    var container = document.querySelector('.masonry');
    var msnry = new Masonry(container, { itemSelector: '.col' });
    Products.find({ storeId: Router.current().params._id }).count();
    Tracker.afterFlush(function () {
      var msnry = new Masonry(container, { itemSelector: '.col' });
      $('img[data-original]').lazyload({
        effect: 'fadeIn'
      });
    });
  })
})

Template.storesShow.helpers({
  store: function () {
    return Stores.findOne(Router.current().params._id)
  },
  products: function() {
    return Products.find({ storeId: Router.current().params._id }, { sort: { createdAt: 1 } });
  },
  getImageHeight: function() {
    rwindow.$width()
    if (!this.image) return;
    var info = this.image.info;
    var colWidth = $('.example-width').width();
    var finalHeight = (info.height * colWidth) / info.width;
    return finalHeight;
  },
});
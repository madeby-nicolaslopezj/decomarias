Template.storesShow.onRendered(function() {
  var self = this;
  self.subscribe('store', Router.current().params._id);

  var container = document.querySelector('.masonry');
  var msnry = new Masonry(container, { itemSelector: '.col' });
  self.autorun(function() {
    Products.find({ storeId: Router.current().params._id }).count();
    var msnry = new Masonry(container, { itemSelector: '.col' });
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
    var info = this.image.info;
    var colWidth = $('.masonry .l3 .card-panel').width();
    var finalHeight = (info.height * colWidth) / info.width;
    return finalHeight;
  },
});
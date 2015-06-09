Template.storesIndex.onRendered(function() {
  this.subscribe('stores')

  var container = document.querySelector('.masonry');
  var msnry = new Masonry(container, { itemSelector: '.col' });
  this.autorun(function() {
    Stores.find().count();
    Tracker.afterFlush(function () {
      var msnry = new Masonry(container, { itemSelector: '.col' });
      Meteor.setTimeout(function() {
        $('.masonry .col').imagesLoaded()
        .always(function() {
          var msnry = new Masonry(container, { itemSelector: '.col' });
        })
      }, 50);
    });
  })
})

Template.storesIndex.helpers({
  stores: function() {
    return Stores.find();
  },
  getImageHeight: function () {
    rwindow.$width()
    var info = this.image.info;
    var colWidth = $('.example-width').width();
    var finalHeight = (info.height * colWidth) / info.width;
    return finalHeight;
  }
});
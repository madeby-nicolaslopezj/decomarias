Template.search.onRendered(function() {

  var instance = EasySearch.getComponentInstance(
    { index: 'products' }
  );

  var self = this;
  var container = document.querySelector('.masonry');

  var remason = function() {
    Meteor.setTimeout(function() {
      var msnry = new Masonry(container, { itemSelector: '.col' });
    }, 1);
  }

  self.autorun(function() {
    Products.find({}).count();
    Tracker.afterFlush(function () {
      remason();
    });
  })

  instance.on('searchingDone', remason);
  instance.on('currentValue', remason);
  instance.on('searchResults', remason);
  instance.on('total', remason);
})

Template.search.helpers({
  getImageHeight: function () {
    rwindow.$width()
    var info = this.image.info;
    var colWidth = $('.example-width').width();
    var finalHeight = (info.height * colWidth) / info.width;
    return finalHeight;
  }
});
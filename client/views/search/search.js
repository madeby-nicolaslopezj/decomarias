Template.search.onRendered(function() {

  var self = this;
  var container = document.querySelector('.masonry');

  var remason = function() {
    Meteor.setTimeout(function() {
      var msnry = new Masonry(container, { itemSelector: '.col' });
      $('img[data-original]').lazyload({
        effect: 'fadeIn',
        placeholder: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      });
    }, 1);
  }

  self.autorun(function() {
    Products.find({}).count();
    Tracker.afterFlush(function () {
      remason();
    });
  })

  this.autorun(function () {
    var instance = EasySearch.getComponentInstance({ index: 'products' });

    instance.on('searchingDone', remason);
    instance.on('currentValue', remason);
    instance.on('searchResults', remason);
    instance.on('total', remason);
  });
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

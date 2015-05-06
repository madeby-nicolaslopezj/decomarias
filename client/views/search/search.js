Template.search.onRendered(function() {

  var instance = EasySearch.getComponentInstance(
    { index: 'products' }
  );

  var self = this;
  var container = document.querySelector('.masonry');

  var remason = function() {
    var msnry = new Masonry(container, { itemSelector: '.col' });
    $('.masonry .col').imagesLoaded()
    .always(function() {
      var msnry = new Masonry(container, { itemSelector: '.col' });
    })
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
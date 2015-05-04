Template.designersIndex.onRendered(function() {
  var self = this;

  self.subscribe('designers');


  var container = document.querySelector('.masonry');
  var msnry = new Masonry(container, { itemSelector: '.col' });
  self.autorun(function() {
    Designers.find().count();
    Tracker.afterFlush(function () {
      var msnry = new Masonry(container, { itemSelector: '.col' });
      $('.masonry .col').imagesLoaded()
      .progress(function() {
        var msnry = new Masonry(container, { itemSelector: '.col' });
      })
    });
  })

})

Template.designersIndex.helpers({
  designers: function() {
    return Designers.find();
  }
});
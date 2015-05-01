Template.categoriesIndex.onRendered(function() {
  var container = document.querySelector('.masonry');
  var msnry = new Masonry(container, { itemSelector: '.col' });
  $('.masonry .col').imagesLoaded()
  .progress(function() {
    var msnry = new Masonry(container, { itemSelector: '.col' });
  })
})

Template.categoriesIndex.helpers({
  categories: function() {
    return topCategories;
  },
  image: function() {
    return orion.dictionary.get('images.' + this.value);
  }
});
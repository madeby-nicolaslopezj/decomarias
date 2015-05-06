Template.favoritesIndex.onRendered(function() {
  this.subscribe('favoritesDetail');
  var container = document.querySelector('.masonry');
  this.autorun(function() {
    Favorites.find().count();
    Tracker.afterFlush(function () {
      var msnry = new Masonry(container, { itemSelector: '.col' });
      Meteor.setTimeout(function() {
        $('.masonry .col').imagesLoaded(function() {
          var msnry = new Masonry(container, { itemSelector: '.col' });
        })
      }, 20);
    });
  })
})

Template.favoritesIndex.helpers({
  favorites: function () {
    return Favorites.find();
  }
});

Template.favoritesIndex.events({
  'click .btn-remove-from-favorites': function () {
    Meteor.call('removeFromFavorites', this._id);
  }
});
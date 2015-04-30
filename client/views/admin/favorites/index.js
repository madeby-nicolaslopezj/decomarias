Template.favoritesIndex.onRendered(function() {
  this.subscribe('favoritesDetail');
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
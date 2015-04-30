Meteor.publish(null, function () {
  return Favorites.find({ userId: this.userId });
});

Meteor.publishComposite('favoritesDetail', function() {
  var userId = this.userId;
  return {
    find: function() {
        return Favorites.find({ userId: this.userId });
    },
    children: [
      {
        find: function(favorite) {
          return Products.find(favorite.product);
        }
      }
    ]
  }
});
Meteor.methods({
  addToFavorites: function(productId) {
    check(productId, String);
    var doc = {
      product: productId,
      userId: this.userId
    };
    return Favorites.insert(doc);
  },
  removeFromFavorites: function(productId) {
    check(productId, String);
    return Favorites.remove({
      product: productId,
      userId: this.userId
    });
  }
});
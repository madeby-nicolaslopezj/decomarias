Favorites.attachSchema(new SimpleSchema({
  product: orion.attribute('hasOne', {}, {
    collection: Products,
    publicationName: 'favoriteProducts',
    titleField: 'name',
  }),
  userId: orion.attribute('createdBy'),
  createdAt: orion.attribute('createdAt')
}));

Favorites.helpers({
  getProduct: function () {
    return Products.findOne(this.product);
  }
});
Meteor.methods({
  getStoreViews: function(storeId) {
    check(storeId, String);

    return Products.find({ storeId: storeId }, { fields: { name: 1, views: 1 } }).map(function(product) {
      product.lastMonthViews = ProductViews.find({ productId: product._id }).count() || 0;
      product.views = product.views || 0;
      return product;
    });
  }
})

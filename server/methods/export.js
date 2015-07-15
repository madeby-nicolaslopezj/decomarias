Meteor.methods({
  getStoreViews: function(storeId) {
    check(storeId, String);
    var lastMonth = moment().subtract(1, 'month').toDate();

    // remove old
    ProductViews.remove({ date: { $lt: lastMonth } });

    return Products.find({ storeId: storeId }, { fields: { name: 1, views: 1 } }).map(function(product) {
      product.lastMonthViews = ProductViews.find({ productId: product._id, date: { $gt: lastMonth } }).count() || 0;
      product.views = product.views || 0;
      return product;
    });
  }
})

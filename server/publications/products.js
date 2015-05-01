Meteor.publishComposite('product', function(productId) {
  check(productId, String);
  return {
    find: function() {
        return Products.find(productId);
    },
    children: [
      {
        find: function(product) {
          return Stores.find(product.storeId);
        }
      }
    ]
  }
});

Meteor.publish('productsByCategory', function (ids) {
  check(ids, [String]);
  return Products.find({ category: { $in: ids } });
});
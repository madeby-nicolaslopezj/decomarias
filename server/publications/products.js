Meteor.publishComposite('product', function(productId) {
  check(productId, String);
  Products.update(productId, { $inc: { views: 1 } });
  ProductViews.insert({ productId: productId });
  return {
    find: function() {
        return Products.find({ _id: productId, hidden: { $ne: true } });
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

Meteor.publish('productsByCategory', function (id) {
  check(id, String);
  return Products.find({ category: id, hidden: { $ne: true } });
});

Meteor.publish('allProducts', function() {
  return Products.find({ hidden: { $ne: true } });
})

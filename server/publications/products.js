Meteor.publishComposite('product', function(productId) {
  check(productId, String);
  Products.update(productId, { $inc: { views: 1 } });
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

Meteor.publish('productsByCategory', function (id) {
  check(id, String);
  return Products.find({ category: id });
});

Meteor.publish('allProducts', function() {
  return Products.find();
})

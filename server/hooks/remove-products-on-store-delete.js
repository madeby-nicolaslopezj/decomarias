Meteor.startup(function() {
  Stores.after.remove(function(userId, doc) {
    Products.remove({ storeId: doc._id });
  });
});

Stores.after.update(function(userId, doc) {
  Products.update({ storeId: doc._id }, { $set: { hidden: doc.hidden } }, { multi: true });
});

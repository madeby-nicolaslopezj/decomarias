Stores.after.update(function(userId, doc) {
  if (doc.discount) {
    Products.update({ storeId: doc._id }, { $set: { discount: doc.discount } }, { multi: true });
  } else {
    Products.update({ storeId: doc._id }, { $unset: { discount: '' } }, { multi: true });
  }
});

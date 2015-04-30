var role = new Roles.Role('store-owner');

Roles.registerAction('updateMyStore', false);

role.allow('collection.stores.update', function(userId, doc, fields, modifier) {
  return doc.owner === userId; // Will be allowed to edit his own posts
});
role.deny('collection.stores.update', function(userId, doc, fields, modifier) {
  return _.contains(fields, 'owner'); // Can't change the userId field
});

role.allow('collection.products.index', true);
role.allow('collection.products.showCreate', true);
role.allow('collection.products.showUpdate', true);

role.allow('collection.products.showRemove', function(doc) {
  var myStore = Stores.findOne({ owner: this.userId });
  return myStore && doc.storeId === myStore._id;
});

role.helper('collection.products.indexFilter', function() {
  var myStore = Stores.findOne({ owner: this.userId });
  return { storeId: myStore._id };
});

role.allow('collection.products.insert', function(userId, doc) {
  var myStore = Stores.findOne({ owner: this.userId });
  return myStore && doc.storeId === myStore._id;
});

role.allow('collection.products.update', function(userId, doc, fields, modifier) {
  var myStore = Stores.findOne({ owner: this.userId });
  return myStore && doc.storeId === myStore._id; // Will be allowed to edit his own posts
});
role.deny('collection.products.update', function(userId, doc, fields, modifier) {
  return _.contains(fields, 'storeId'); // Can't change the userId field
});

role.allow('collection.products.remove', function(userId, doc) {
  var myStore = Stores.findOne({ owner: this.userId });
  return myStore && doc.storeId === myStore._id;
});
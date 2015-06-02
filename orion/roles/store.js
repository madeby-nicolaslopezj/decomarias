var role = new Roles.Role('store-owner');

Roles.registerAction('updateMyStore', false);

role.allow('updateMyStore', true);

role.allow('collections.stores.update', function(userId, doc, fields, modifier) {
  return doc.owner === userId; // Will be allowed to edit his own posts
});
role.deny('collections.stores.update', function(userId, doc, fields, modifier) {
  return _.contains(fields, 'owner'); // Can't change the userId field
});

role.allow('collections.products.index', true);
role.allow('collections.products.showCreate', true);
role.allow('collections.products.showUpdate', true);

role.allow('collections.products.showRemove', function(doc) {
  var myStore = Stores.findOne({ owner: this.userId });
  return myStore && doc.storeId === myStore._id;
});

role.helper('collections.products.indexFilter', function() {
  var myStore = Stores.findOne({ owner: this.userId });
  return { storeId: myStore._id };
});

role.allow('collections.products.insert', function(userId, doc) {
  var myStore = Stores.findOne({ owner: this.userId });
  return myStore && doc.storeId === myStore._id;
});

role.allow('collections.products.update', function(userId, doc, fields, modifier) {
  var myStore = Stores.findOne({ owner: this.userId });
  return myStore && doc.storeId === myStore._id; // Will be allowed to edit his own posts
});
role.deny('collections.products.update', function(userId, doc, fields, modifier) {
  return _.contains(fields, 'storeId'); // Can't change the userId field
});

role.allow('collections.products.remove', function(userId, doc) {
  var myStore = Stores.findOne({ owner: this.userId });
  return myStore && doc.storeId === myStore._id;
});
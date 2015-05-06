Meteor.publish('myStore', function() {
  if (!Roles.userHasRole(this.userId, 'store-owner')) {
    return [];
  }
  if (Stores.find({ owner: this.userId }).count() == 0) {
    Stores.insert({ owner: this.userId }, { validate: false });
  }
  return Stores.find({ owner: this.userId });
})

Meteor.publish('store', function(storeId) {
  check(storeId, String);
  return [Stores.find(storeId), Products.find({ storeId: storeId })];
})

Meteor.publish('stores', function() {
  return Stores.find();
})
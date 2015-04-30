Meteor.publish('myStore', function() {
  if (!Roles.userHasRole(this.userId, 'store-owner')) {
    return [];
  }
  if (Stores.find({ owner: this.userId }).count() == 0) {
    Stores.insert({ owner: this.userId }, { validate: false });
  }
  return Stores.find({ owner: this.userId });
})
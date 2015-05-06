Template.storesIndex.onRendered(function() {
  this.subscribe('stores')
})

Template.storesIndex.helpers({
  stores: function() {
    return Stores.find();
  }
});
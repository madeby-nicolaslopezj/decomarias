Template.productsShow.onRendered(function() {
  this.subscribe('product', Router.current().params._id);
  this.autorun(function() {
    Products.findOne(Router.current().params._id);
    Tracker.afterFlush(function () {
      $('.materialboxed').materialbox();
      this.$('.parallax').parallax();
        $('.dropdown-button').dropdown();
    });
  })
})

Template.productsShow.helpers({
  product: function () {
    return Products.findOne(Router.current().params._id);
  }
});

Template.productsShow.events({
  'click .add-to-favorites-btn': function() {
    Meteor.call('addToFavorites', this._id);
  },
  'click .remove-from-favorites-btn': function() {
    Meteor.call('removeFromFavorites', this._id);
  },
  'click .btn-add-to-project': function() {
    Meteor.call('addToProject', Router.current().params._id, this._id);
  }
});
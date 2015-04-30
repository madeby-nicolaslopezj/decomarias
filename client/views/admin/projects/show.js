Template.collectionsProjectsShow.onRendered(function() {
  this.subscribe('projectDetail', Router.current().params._id);
})

Template.collectionsProjectsShow.helpers({
  project: function () {
    return Projects.findOne(Router.current().params._id);
  }
});

Template.collectionsProjectsShow.events({
  'click .btn-remove-from-project': function () {
    Meteor.call('removeFromProject', this._id, Router.current().params._id);
  }
});
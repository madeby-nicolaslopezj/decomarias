Template.collectionsProjectsShow.onRendered(function() {
  this.subscribe('projectDetail', Router.current().params._id);

  var container = document.querySelector('.masonry');
  this.autorun(function() {
    Projects.findOne(Router.current().params._id).getProducts().count();
    Tracker.afterFlush(function () {
      var msnry = new Masonry(container, { itemSelector: '.col' });
      Meteor.setTimeout(function() {
        $('.masonry .col').imagesLoaded(function() {
          var msnry = new Masonry(container, { itemSelector: '.col' });
        })
      }, 20);
    });
  })
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
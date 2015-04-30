Template.adminProjectsIndex.onRendered(function() {

})

Template.adminProjectsIndex.helpers({
  projects: function () {
    return Meteor.user().projects();
  }
});
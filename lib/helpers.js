Meteor.users.helpers({
  projects: function () {
    return Projects.find({ userId: this._id });
  }
});
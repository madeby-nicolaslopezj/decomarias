Template.postsShow.onCreated(function() {
  var self = this;
  self.autorun(function () {
    self.subscribe('post', Router.current().params._id);
  });
})

Template.postsShow.helpers({
  post: function () {
    return Posts.findOne(Router.current().params._id);
  }
});
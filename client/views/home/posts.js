Template.homePosts.onCreated(function() {
  this.subscribe('homePosts');
});

Template.homePosts.onRendered(function() {
  this.autorun(function() {
    if (!Template.instance().subscriptionsReady()) return;

    $('.slider').slider();
  })
})

Template.homePosts.helpers({
  posts: function () {
    return Posts.find({}, { limit: 6, sort: { createdAt: -1 } });
  }
});
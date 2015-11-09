Meteor.publish('homePosts', function () {
  return Posts.find({}, { limit: 6, sort: { createdAt: -1 } });
});

Meteor.publish('post', function(postId) {
  check(postId, String);
  return Posts.find({ _id: postId });
});

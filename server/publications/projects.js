Meteor.publish(null, function () {
  return Projects.find({ userId: this.userId });
});

Meteor.publishComposite('projectDetail', function(projectId) {
  check(projectId, String);
  var userId = this.userId;
  return {
    find: function() {
        return Projects.find({ _id: projectId, userId: userId });
    },
    children: [
      {
        find: function(project) {
          return project.getProducts();
        }
      }
    ]
  }
});
Meteor.publishComposite(null, function() {
  var userId = this.userId;
  return {
    find: function() {
        return Projects.find({ userId: userId });
    },
    children: [
      {
        find: function(project) {
          return Products.find({ _id: { $in: (project.products || []) }, hidden: { $ne: true } }, { fields: { name: 1, price: 1 } });
        }
      }
    ]
  }
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

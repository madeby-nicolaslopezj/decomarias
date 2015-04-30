Meteor.methods({
  addToProject: function(productId, projectId) {
    check(productId, String);
    check(projectId, String);
    return Projects.update({
      _id: projectId,
      userId: this.userId
    }, {
      $addToSet: { products: productId }
    });
  },
  removeFromProject: function(productId, projectId) {
    check(productId, String);
    check(projectId, String);
    return Projects.update({
      _id: projectId,
      userId: this.userId
    }, {
      $pull: { products: productId }
    });
  }
});
var role = new Roles.Role('users');

role.allow('collection.favorites.index', true);
role.allow('collection.favorites.insert', function(userId, doc){
  return doc.userId === userId;
});
role.allow('collection.favorites.update', function(userId, doc, fields, modifier){
  return doc.userId === userId;
});
role.deny('collection.favorites.update', function(userId, doc, fields, modifier){
  return _.contains(fields, 'userId');
});
role.allow('collection.favorites.remove', function(userId, doc){
  return doc.userId === userId;
});
role.allow('collection.favorites.showCreate', true);
role.allow('collection.favorites.showUpdate', true);
role.allow('collection.favorites.showRemove', true);

role.helper('collection.favorites.indexFilter', function() {
  return { userId: this.userId };
});



role.allow('collection.projects.index', true);
role.allow('collection.projects.insert', function(userId, doc){
  return doc.userId === userId;
});
role.allow('collection.projects.update', function(userId, doc, fields, modifier){
  return doc.userId === userId;
});
role.deny('collection.projects.update', function(userId, doc, fields, modifier){
  return _.contains(fields, 'userId');
});
role.allow('collection.projects.remove', function(userId, doc){
  return doc.userId === userId;
});
role.allow('collection.projects.showCreate', true);
role.allow('collection.projects.showUpdate', true);
role.allow('collection.projects.showRemove', true);

role.helper('collection.projects.indexFilter', function() {
  return { userId: this.userId };
});
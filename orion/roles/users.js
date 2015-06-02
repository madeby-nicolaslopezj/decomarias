var role = new Roles.Role('users');

role.allow('collections.favorites.index', true);
role.allow('collections.favorites.insert', function(userId, doc){
  return doc.userId === userId;
});
role.allow('collections.favorites.update', function(userId, doc, fields, modifier){
  return doc.userId === userId;
});
role.deny('collections.favorites.update', function(userId, doc, fields, modifier){
  return _.contains(fields, 'userId');
});
role.allow('collections.favorites.remove', function(userId, doc){
  return doc.userId === userId;
});
role.allow('collections.favorites.showCreate', true);
role.allow('collections.favorites.showUpdate', true);
role.allow('collections.favorites.showRemove', true);

role.helper('collections.favorites.indexFilter', function() {
  return { userId: this.userId };
});



role.allow('collections.projects.index', true);
role.allow('collections.projects.insert', function(userId, doc){
  return doc.userId === userId;
});
role.allow('collections.projects.update', function(userId, doc, fields, modifier){
  return doc.userId === userId;
});
role.deny('collections.projects.update', function(userId, doc, fields, modifier){
  return _.contains(fields, 'userId');
});
role.allow('collections.projects.remove', function(userId, doc){
  return doc.userId === userId;
});
role.allow('collections.projects.showCreate', true);
role.allow('collections.projects.showUpdate', true);
role.allow('collections.projects.showRemove', true);

role.helper('collections.projects.indexFilter', function() {
  return { userId: this.userId };
});
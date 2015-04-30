var role = Roles._adminRole;

role.deny('collection.favorites.index', true);
role.deny('collection.projects.index', true);
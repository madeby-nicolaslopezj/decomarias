var role = Roles._adminRole;

role.deny('collections.favorites.index', true);
role.deny('collections.projects.index', true);
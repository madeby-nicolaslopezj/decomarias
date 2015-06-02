Options.set('forbidClientAccountCreation', false);

Options.set('profileSchema', {
  picture: orion.attribute('file', {
      label: 'Picture',
      optional: true
  }),
  name: {
    type: String
  }
});

Options.set('defaultRoles', ['users']);

Options.set('siteName', 'Decomarías')

ReactiveTemplates.set('collections.projects.index', 'adminProjectsIndex');
ReactiveTemplates.set('collections.projects.create', 'adminProjectsCreate');
ReactiveTemplates.set('collections.projects.update', 'adminProjectsUpdate');
ReactiveTemplates.set('collections.projects.delete', 'adminProjectsDelete');

ReactiveTemplates.set('collections.favorites.index', 'favoritesIndex');

//ReactiveTemplates.set('collections.products.create', 'adminProductsCreate');
//ReactiveTemplates.set('collections.products.update', 'adminProductsUpdate');
//ReactiveTemplates.set('collections.products.delete', 'adminProductsDelete');
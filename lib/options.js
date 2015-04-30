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

Options.set('siteName', 'Deco Marías')

ReactiveTemplates.set('collectionIndex.projects', 'adminProjectsIndex');
ReactiveTemplates.set('collectionCreate.projects', 'adminProjectsCreate');
ReactiveTemplates.set('collectionUpdate.projects', 'adminProjectsUpdate');
ReactiveTemplates.set('collectionDelete.projects', 'adminProjectsDelete');

ReactiveTemplates.set('collectionIndex.favorites', 'favoritesIndex');

ReactiveTemplates.set('collectionCreate.products', 'adminProductsCreate');
ReactiveTemplates.set('collectionUpdate.products', 'adminProductsUpdate');
ReactiveTemplates.set('collectionDelete.products', 'adminProductsDelete');
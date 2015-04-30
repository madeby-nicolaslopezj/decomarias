Router.route('/', {
	name: 'home',
	layoutTemplate: 'layout'
});

Router.route('/producto/:_id', {
  name: 'products.show',
  layoutTemplate: 'layout'
});

Router.route('/admin/projects/:_id/show', {
  name: 'collections.projects.show',
  layoutTemplate: 'orionMaterializeLayout'
});

Router.route('/admin/store', {
  name: 'admin.store.update',
  layoutTemplate: 'orionMaterializeLayout',
  waitOn: function() {
    return Meteor.subscribe('myStore');
  }
});

Router.route('/categorias/:value', {
  name: 'categories.show',
  layoutTemplate: 'layout'
});

orion.addLink({
  routeName: 'admin.store.update',
  activeRouteRegex: 'admin.store',
  title: 'Mi Tienda',
  section: 'top',
  permission: 'updateMyStore'
});
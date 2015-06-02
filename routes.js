Router.route('/', {
  name: 'construction'
})

Router.route('/home', {
	name: 'home',
	layoutTemplate: 'layout'
});

Router.route('/buscar', {
  name: 'search',
  layoutTemplate: 'layout'
});

Router.route('/producto/:_id', {
  name: 'products.show',
  layoutTemplate: 'layout'
});

Router.route('/categorias', {
  name: 'categories.index',
  layoutTemplate: 'layout'
});

Router.route('/categorias/:value', {
  name: 'categories.show',
  layoutTemplate: 'layout'
});

Router.route('/tiendas', {
  name: 'stores.index',
  layoutTemplate: 'layout'
});

Router.route('/tiendas/:_id', {
  name: 'stores.show',
  layoutTemplate: 'layout'
});

Router.route('/disenadores', {
  name: 'designers.index',
  layoutTemplate: 'layout'
});



/**
 * Admin
 */

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

if (Meteor.isClient) {
  orion.addLink({
    routeName: 'admin.store.update',
    activeRouteRegex: 'admin.store',
    title: 'Mi Tienda',
    section: 'top',
    permission: 'updateMyStore'
  });
}
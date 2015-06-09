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
 * Ads
 */
Router.route('ads/:_id', function() {
  var ad = Ads.findOne(this.params._id);
  Ads.update(ad._id, { $inc: { clicks: 1 } });

  var adUrl = url.parse(ad.url, true);

  var query = {
    utm_source: 'Decomarias.cl',
    utm_medium: 'banner',
    utm_content: ad._id,
    utm_campaign: ad.location
  }

  adUrl.query = _.extend(adUrl.query, query);
  adUrl.search = null;

  this.response.end('<script>window.location.replace("' + adUrl.format() + '");</script>')
}, { where: 'server', name: 'ad.url' });


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
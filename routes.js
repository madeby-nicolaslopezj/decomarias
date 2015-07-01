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

Router.route('/categorias/:value/:type?', {
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

Router.route('/posts/:_id', {
  name: 'posts.show',
  layoutTemplate: 'layout'
});

/**
 * Ads
 */
Router.route('ads/:_id', function() {
  var ad = Ads.findOne(this.params._id);

  if (!ad.url) {
    this.response.end('Error');
    return;
  }

  Ads.update(ad._id, { $inc: { clicks: 1 } });

  var adUrl = UrlUtils.parse(ad.url, true);

  var query = {
    utm_source: 'Decomarias.cl',
    utm_medium: 'banner',
    utm_content: ad._id,
    utm_campaign: ad.location
  }

  adUrl.query = _.extend(query, adUrl.query);
  adUrl.search = null;
  //this.response.end(UrlUtils.format(adUrl));
  this.response.end('<script>window.location.replace("' + UrlUtils.format(adUrl) + '");</script>')
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

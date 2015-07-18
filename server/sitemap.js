var htmlEntities = function(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


sitemaps.add('/sitemap.xml', function() {

  var basicRoutes = ['home', 'search', 'categories.index', 'stores.index', 'designers.index'];

  var items = [];

  _.each(basicRoutes, function(routeName){
    items.push({
      page: Router.path(routeName),
      lastmod: new Date(),
      changefreq: 'weekly',
    })
  });

  Products.find().forEach(function(doc) {
    var item = {
      page: Router.path('products.show', doc),
      lastmod: new Date(),
      changefreq: 'weekly'
    };
    if (doc.image && doc.image.url) {
      item.images = [{
        loc: doc.image.url,
        caption: htmlEntities(doc.description) || '',
        title: htmlEntities(doc.name) || ''
      }]
    }
    items.push(item);
  });

  Stores.find().forEach(function(doc) {
    var item = {
      page: Router.path('stores.show', doc),
      lastmod: new Date(),
      changefreq: 'weekly'
    };
    if (doc.logo && doc.logo.url) {
      item.images = [{
        loc: doc.logo.url,
        caption: 'Store',
        title: htmlEntities(doc.name) || ''
      }]
    }
    items.push(item);
  });

  Posts.find().forEach(function(doc) {
    var item = {
      page: Router.path('posts.show', doc),
      lastmod: new Date(),
      changefreq: 'weekly'
    };
    if (doc.image && doc.image.url) {
      item.images = [{
        loc: doc.image.url,
        caption: htmlEntities(doc.caption) || '',
        title: htmlEntities(doc.title) || ''
      }]
    }
    items.push(item);
  });

  Categories.find().forEach(function(doc) {
    if (!doc.getCategoryValue()) return;
    var item = {
      page: Router.path('categories.show', { value: doc.getCategoryValue(), type: doc._id }),
      lastmod: new Date(),
      changefreq: 'weekly'
    };
    items.push(item);
  });

  return items;
});

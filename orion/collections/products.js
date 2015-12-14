Products.attachSchema(new SimpleSchema({
  hidden: {
    type: Boolean,
    label: 'Escondido',
    optional: true,
    autoform: {
      omit: true
    }
  },
  name: {
    type: String,
    label: 'Nombre'
  },
  category: orion.attribute('hasMany', { label: 'Categoría' }, {
    collection: Categories,
    publicationName: 'productsPosts',
    titleField: 'type',
    additionalFields: ['category', 'subcategory'],
    render: {
      item: function(item, escape) {
        return '<div class="product-category">' +
        '<span class="category">' + escape(item['category']) + ' > </span>' +
        '<span class="subcategory">' + escape(item['subcategory']) + ' > </span>' +
        '<span class="type">' + escape(item['type']) + '</span>' +
        '</div>';
      },
      option: function(item, escape) {
        return '<div class="product-category">' +
        '<span class="category">' + escape(item['category']) + ' > </span>' +
        '<span class="subcategory">' + escape(item['subcategory']) + ' > </span>' +
        '<span class="type">' + escape(item['type']) + '</span>' +
        '</div>';
      }
    },
  }),
  storeId: orion.attribute('hasOne', {
    label: 'Tienda',
    autoValue: function() {
      if (Roles.userHasRole(this.userId, 'store-owner')) {
        return Stores.findOne({ owner: this.userId })._id;
      }
    }
  }, {
    collection: Stores,
    publicationName: 'productsStores',
    titleField: 'name',
    filter: function(userId) {
      return Roles.userHasRole(userId, 'admin') ? {} : { owner: userId };
    },
    additionalFields: ['owner']
  }),
  image: orion.attribute('image', {
    label: 'Imagen Principal'
  }),
  image1: orion.attribute('image', {
    label: 'Imagen Secundaria 1',
    optional: true
  }),
  image2: orion.attribute('image', {
    label: 'Imagen Secundaria 2',
    optional: true
  }),
  image3: orion.attribute('image', {
    label: 'Imagen Secundaria 3',
    optional: true
  }),
  image4: orion.attribute('image', {
    label: 'Imagen Secundaria 4',
    optional: true
  }),
  description: {
    type: String,
    label: 'Descripción'
  },
  price: {
    type: Number,
    label: 'Precio (solo numeros)',
    optional: true
  },
  dimensions: {
    type: String,
    label: 'Dimensiones'
  },
  material: {
    type: String,
    label: 'Materialidad'
  },
  views: {
    type: Number,
    label: 'Views',
    defaultValue: 0
  },
  createdAt: orion.attribute('createdAt'),
  discount: {
    type: Number,
    min: 1,
    max: 100,
    optional: true,
    label: 'Descuento',
    autoform: {
      omit: true
    }
  }
}));

Products.helpers({
  store: function () {
    return Stores.findOne(this.storeId);
  },
  isInFavorites: function(userId) {
    return Favorites.find({ product: this._id, userId: userId }).count() !== 0;
  }
});


ProductsIndex = new EasySearch.Index({
  collection: Products,
  fields: ['name', 'description'],
  engine: new EasySearch.MongoDB({
    sort: () => ['score'],
    selector: function(searchObject, options, aggregation) {
      var searchString = searchObject.name;
      var categories = _.pluck(Categories.find({ $or: [ { category: new RegExp(searchString, 'i') }, { subcategory: new RegExp(searchString, 'i') }, { type: new RegExp(searchString, 'i') } ] }, { fields: { _id: 1 } }).fetch(), '_id');
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      if (_.isArray(selector.$or) && _.isArray(categories) && categories) {
        selector.$or.push({ category: { $in: categories } });
      }

      selector.hidden = { $ne: true };

      return selector;
    }
  })
});

Products.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre'
  },
  category: orion.attribute('hasMany', { label: 'Categoría' }, {
    collection: Categories,
    publicationName: 'productsPosts',
    titleField: 'type',
    aditionalFields: ['category', 'subcategory'],
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
    aditionalFields: ['owner']
  }),
  image: orion.attribute('file', {
    label: 'Imagen Principal'
  }),
  image1: orion.attribute('file', {
    label: 'Imagen Secundaria 1',
    optional: true
  }),
  image2: orion.attribute('file', {
    label: 'Imagen Secundaria 2',
    optional: true
  }),
  image3: orion.attribute('file', {
    label: 'Imagen Secundaria 3',
    optional: true
  }),
  image4: orion.attribute('file', {
    label: 'Imagen Secundaria 4',
    optional: true
  }),
  description: {
    type: String,
    label: 'Descripción'
  },
  price: {
    type: Number,
    label: 'Precio (solo numeros)'
  },
  dimensions: {
    type: String,
    label: 'Dimensiones'
  },
  material: {
    type: String,
    label: 'Materialidad'
  }
}));



Products.helpers({
  store: function () {
    return Stores.findOne(this.storeId);
  },
  isInFavorites: function(userId) {
    return Favorites.find({ product: this._id, userId: userId }).count() != 0;
  }
});

Products.initEasySearch(['name', 'description'], {
    'limit' : 20,
    'use' : 'mongo-db'
});
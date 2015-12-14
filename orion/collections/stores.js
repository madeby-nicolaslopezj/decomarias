Stores.attachSchema(new SimpleSchema({
  hidden: {
    type: Boolean,
    label: 'Escondido'
  },
  name: {
    type: String,
    label: 'Nombre'
  },
  owner: orion.attribute('user', { label: 'Dueño' }, {
    publicationName: 'storesUser'
  }),
  phone: {
    type: String,
    label: 'Teléfono'
  },
  email: {
    type: String,
    label: 'Email'
  },
  direction: {
    type: String,
    label: 'Dirección'
  },
  website: {
    type: String,
    optional: true,
    label: 'Sitio Web'
  },
  logo: orion.attribute('image', {
    label: 'Logo'
  }),
  discount: {
    type: Number,
    min: 1,
    max: 100,
    optional: true,
    label: 'Descuento'
  }
}));

StoresIndex = new EasySearch.Index({
  collection: Stores,
  fields: ['name', 'website', 'direction'],
  engine: new EasySearch.MongoDB({
    sort: () => ['score'],
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
      selector.hidden = { $ne: true };
      return selector;
    }
  })
});

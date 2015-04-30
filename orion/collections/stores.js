Stores.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre'
  },
  owner: orion.attribute('user', {}, {
    publicationName: 'storesUser'
  }),
  phone: {
    type: String,
    label: 'Teléfono'
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
  logo: orion.attribute('file', {
    label: 'Logo',
    optional: true
  }),
  backgroundImage: orion.attribute('file', {
    label: 'Imagen de Fondo',
    optional: true
  }),
}));
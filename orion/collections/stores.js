Stores.attachSchema(new SimpleSchema({
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
  logo: orion.attribute('file', {
    label: 'Logo'
  })
}));
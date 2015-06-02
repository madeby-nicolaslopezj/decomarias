Designers.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre'
  },
  email: {
    type: String,
    label: 'Email',
    optional: true
  },
  phone: {
    type: String,
    label: 'Telefono',
    optional: true
  },
  website: {
    type: String,
    label: 'Sitio Web',
    optional: true
  },
  logo: orion.attribute('file')
}));
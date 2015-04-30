Designers.attachSchema(new SimpleSchema({
  name: {
    type: String
  },
  email: {
    type: String,
    optional: true
  },
  phone: {
    type: String,
    optional: true
  },
  website: {
    type: String,
    optional: true
  },
  logo: orion.attribute('file')
}));
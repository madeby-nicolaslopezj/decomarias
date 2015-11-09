Banners.attachSchema(new SimpleSchema({
  index: {
    type: Number,
    label: 'Posición'
  },
  image: orion.attribute('image', {
    label: 'Imagen'
  }),
  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url
  },
}));

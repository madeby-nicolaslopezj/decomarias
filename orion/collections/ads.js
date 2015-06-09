Ads.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: 'Título'
  },
  image: orion.attribute('image', {
    label: 'Imagen'
  }),
  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url
  },
  location: {
    type: String,
    allowedValues: ['home-top', 'home-right'],
    label: 'Ubicación'
  },
  clicks: {
    type: Number,
    defaultValue: 0,
    autoform: {
      omit: true
    }
  },
  views: {
    type: Number,
    defaultValue: 0,
    autoform: {
      omit: true
    }
  }
}));
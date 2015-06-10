Posts.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: 'Título'
  },
  caption: {
    type: String,
    label: 'Caption'
  },
  image: orion.attribute('image', {
      label: 'Imagen',
      optional: true
  }),
  body: orion.attribute('froala', {
      label: 'Contenido'
  }),
  createdBy: orion.attribute('createdBy'),
  createdAt: orion.attribute('createdAt')
}));
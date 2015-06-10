orion.pages.addTemplate({
    template: 'pagesSimple', 
    layout: 'layout',
    name: 'Simple',
    description: 'Simple template',
}, {
  position: {
    type: Number,
    label: 'Posición'
  },
  content: orion.attribute('froala', {
    label: 'Contenido'
  })
})
Categories.attachSchema(new SimpleSchema({
  category: {
    type: String,
    label: 'Categoría',
    allowedValues: _.pluck(topCategories, 'label')
  },
  subcategory: {
    type: String,
    label: 'Sub-categoría'
  },
  type: {
    type: String,
    label: 'Tipo'
  }
}));
Categories.attachSchema(new SimpleSchema({
  category: {
    type: String,
    label: 'Categoría',
    allowedValues: _.pluck(topCategories, 'label'),
    index: 1
  },
  subcategory: {
    type: String,
    label: 'Sub-categoría',
    index: 1
  },
  type: {
    type: String,
    label: 'Tipo',
    index: 1
  }
}));

Categories.helpers({
  getCategoryValue: function() {
    var top = _.findWhere(topCategories, { label: this.category });
    return top && top.value;
  }
})

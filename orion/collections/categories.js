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

Categories.helpers({
  getCategoryValue: function() {
    var top = _.findWhere(topCategories, { label: this.category });
    return top && top.value;
  }
})

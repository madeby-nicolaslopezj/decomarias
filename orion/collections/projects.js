Projects.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre'
  },
  budget: {
    type: Number,
    label: 'Presupuesto',
    optional: true
  },
  products: orion.attribute('hasMany', { optional: true }, {
    collection: Products,
    publicationName: 'projectsProducts',
    titleField: 'name',
  }),
  userId: orion.attribute('createdBy'),
  createdAt: orion.attribute('createdAt')
}));

Projects.helpers({
  hasProduct: function(productId) {
    return _.contains(this.products, productId);
  },
  getProducts: function() {
    return Products.find({ _id: { $in: (this.products || []) } });
  },
  cost: function() {
    return _.reduce(this.getProducts().fetch(), function(memo, item){
      return memo + (item.price ? item.price : 0);
    }, 0)
  },
  numberOfProducts: function() {
    var count = (this.products && this.products.length) || 0;
    if (count == 1){
      return '1 producto';
    }
    return count + ' productos';
  }
});
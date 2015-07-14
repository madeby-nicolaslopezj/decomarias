ProductViews.attachSchema(new SimpleSchema({
  productId: {
    type: String,
    index: 1
  },
  date: orion.attribute('createdAt')
}))

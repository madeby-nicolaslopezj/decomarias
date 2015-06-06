Template.categoriesIndex.onRendered(function() {

})

Template.categoriesIndex.helpers({
  categories: function() {
    return topCategories;
  },
  image: function() {
    return orion.dictionary.get('images.' + this.value);
  }
});
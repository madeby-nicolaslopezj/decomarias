ReactiveTemplates.onRendered('collectionIndex.products', function() {
  this.subscribe('myStore');
})
ReactiveTemplates.onRendered('collectionUpdate.products', function() {
  this.subscribe('myStore');
})
ReactiveTemplates.onRendered('collectionDelete.products', function() {
  this.subscribe('myStore');
})
ReactiveTemplates.onRendered('collectionCreate.products', function() {
  this.subscribe('myStore');
})
Template.footer.onCreated(function() {
  this.subscribe('pages');
})

Template.footer.helpers({
  pages: function () {
    return orion.pages.collection.find({}, { sort: { position: 1 } });
  }
});
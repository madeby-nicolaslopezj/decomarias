Template.home.onCreated(function() {
  this.subscribe('homeBanners');
});

Template.home.onRendered(function() {
  this.autorun(() => {
    Banners.find({}).fetch();
    Tracker.afterFlush(() => {
      this.$('.slider').slider();
    });
  });
});

Template.home.helpers({
  banners: function () {
    var pages = [];
    var page = [];
    Banners.find({}, { sort: { index: 1 } }).forEach(function(post) {
      page.push(post);
      if (page.length == 2) {
        pages.push(_.clone(page));
        page = [];
      }
    });
    if (page.length == 1) {
      pages.push(_.clone(page));
      page = [];
    }
    return pages;
  }
});

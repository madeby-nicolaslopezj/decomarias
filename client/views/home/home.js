Template.home.onCreated(function() {
  this.subscribe('homeBanners');
  this.subscribe('homePosts');
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
  posts: function() {
    return Posts.find({}, { limit: 6, sort: { createdAt: -1 } });
  },
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

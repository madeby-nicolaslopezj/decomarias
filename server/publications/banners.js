Meteor.publish('homeBanners', function() {
  return Banners.find();
});

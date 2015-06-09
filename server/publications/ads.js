Meteor.publish('ads', function (location) {
  check(location, String);
  var ad = Ads.findOne({ location: location }, { sort: { views: 1 } });
  if (!ad) return;
  Ads.update(ad._id, { $inc: { views: 1 } });
  return Ads.find({ _id: ad._id }, { fields: { views: 0, clicks: 0 } });
});
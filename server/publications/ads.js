Meteor.publish('ads', function (location) {
  check(location, String);

  var adList = [];
  Ads.find({ location: location }).forEach(function (ad) {
    _.range(ad.count).map(function() {
      adList.push(ad._id);
    })
  });

  var adId = adList[Math.floor(Math.random() * adList.length)];

  Ads.update(adId, { $inc: { views: 1 } });
  return Ads.find({ _id: adId }, { fields: { views: 0, clicks: 0 } });
});
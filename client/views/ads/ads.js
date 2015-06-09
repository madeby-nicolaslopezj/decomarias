Template.ads.onCreated(function() {
  var self = this;

  // Use self.subscribe with the data context reactively
  self.autorun(function () {
    var dataContext = Template.currentData();
    self.subscribe('ads', dataContext.location);
  });
})

Template.ads.onRendered(function() {
  this.$('.slider').slider({ indicators: false });
})

Template.ads.helpers({
  ad: function() {
    return Ads.findOne({ location: this.location });
  },
  getImageHeight: function() {
    var template = Template.instance();
    rwindow.$width()
    var info = this.image.info;
    var colWidth = template.$('.ad-container').width();
    var finalHeight = (info.height * colWidth) / info.width;
    return finalHeight;
  },
});
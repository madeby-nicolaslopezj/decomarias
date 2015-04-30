Meteor.publish('designers', function () {
  return Designers.find();
});
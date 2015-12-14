Meteor.users.helpers({
  projects: function () {
    return Projects.find({ userId: this._id });
  }
});

numberFormat = function(number) {
  while (/(\d+)(\d{3})/.test(number.toString())){
    number = number.toString().replace(/(\d+)(\d{3})/, '$1'+'.'+'$2');
  }
  return number;
}

if (Meteor.isClient) {
  Template.registerHelper('format', function(number) {
    return numberFormat(number);
  })

  Template.registerHelper('getthis', function() {
    console.log(this);
  });
}

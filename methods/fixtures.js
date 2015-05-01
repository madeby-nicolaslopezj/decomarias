if (Meteor.isServer) {
  Meteor.methods({
    createMagic: function () {
      var categories = Categories.find().fetch();
      var base = Products.findOne();
      delete base._id;
      _.each(_.range(100), function(){
        base.name = faker.company.companyName();
        base.description = faker.lorem.sentence(1);
        base.image.url = faker.image.image();
        base.price = _.random(30, 200) * 500;
        base.category = [_.shuffle(categories)[0]._id, _.shuffle(categories)[0]._id];

        Products.insert(base);
      });
    }
  });
}
//Meteor.call('createMagic');
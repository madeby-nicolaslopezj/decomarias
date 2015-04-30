Template.adminStoreUpdate.helpers({
  store: function () {
    return Stores.findOne({ owner: Meteor.userId() });
  }
});

Template.adminStoreUpdate.events({
  'click .save-btn': function () {
    $('#adminStoreUpdateForm').submit();
  }
});

AutoForm.addHooks('adminStoreUpdateForm', {
  onSuccess: function() {
    Materialize.toast('Guardado', 4000)
  }
});
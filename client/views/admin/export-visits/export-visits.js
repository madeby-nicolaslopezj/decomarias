Template.adminExportVisits.events({
  'click .btn': function(event, template) {
    Meteor.call('getStoreViews', this._id, function(error, result) {
      var csv = 'sep=;%0AID;Nombre;Total;Ultimo mes%0A';
      csv += result.map(function(d){
        return _.values(d).map(function(string) { return encodeURI(string); }).join(';');
      })
      .join('%0A');
      csv += '%0A';

      var a         = document.createElement('a');
      a.href        = 'data:text/csv;charset=utf-8,' + csv;
      a.target      = '_blank';
      a.download    = 'data.csv';

      document.body.appendChild(a);
      a.click();
    })
  }
})

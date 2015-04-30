topCategories = [
  {
    label: 'Muebles',
    value: 'muebles'
  },
  {
    label: 'Pisos',
    value: 'pisos'
  },
  {
    label: 'Decoración',
    value: 'decoracion'
  },
  {
    label: 'Iluminación',
    value: 'iluminacion'
  },
  {
    label: 'Baños',
    value: 'banos'
  },
  {
    label: 'Cocina',
    value: 'cocina'
  },
  {
    label: 'Textil',
    value: 'textil'
  }
];

if (Meteor.isClient) {
  Template.registerHelper('topCategories', function() {
    return topCategories;
  })
}
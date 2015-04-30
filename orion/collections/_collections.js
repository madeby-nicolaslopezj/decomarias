Categories = new orion.collection('categories', {
  singularName: 'Category',
  pluralName: 'Categories',
  link: {
    title: 'Categorias' 
  },
  tabular: {
    columns: [
      { data: "category", title: "Categoría" },
      { data: "subcategory", title: "Sub-categoria" },
      { data: "type", title: "Tipo" },
    ]
  }
});

Products = new orion.collection('products', {
  singularName: 'Product', 
  pluralName: 'Products',
  title: 'Productos',
  link: {
    title: 'Productos' 
  },
  tabular: {
    columns: [
      { data: "name", title: "Name" },
      { data: "description", title: "Descripción" },
    ]
  }
});

Stores = new orion.collection('stores', {
  singularName: 'Store', 
  pluralName: 'Stores', 
  link: {
    title: 'Tiendas' 
  },
  tabular: {
    columns: [
      { data: "name", title: "Name" },
      orion.attributeColumn('user', 'owner', 'Owner')
    ]
  }
});

Projects = new orion.collection('projects', {
  singularName: 'Project', 
  pluralName: 'Projects', 
  link: {
    title: 'Proyectos' 
  },
  tabular: {
    columns: [
      { data: "name", title: "Name" },
    ]
  }
});

Favorites = new orion.collection('favorites', {
  singularName: 'Favorite', 
  pluralName: 'Favorites', 
  link: {
    title: 'Favoritos' 
  },
  tabular: {
    columns: [
      orion.attributeColumn('hasOne', 'product', 'Product')
    ]
  }
});

Designers = new orion.collection('designers', {
  singularName: 'Designer', 
  pluralName: 'Designers', 
  link: {
    title: 'Designers' 
  },
  tabular: {
    columns: [
      { data: "name", title: "Name" },
      { data: "email", title: "Email" },
    ]
  }
});
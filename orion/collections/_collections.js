Categories = new orion.collection('categories', {
  singularName: 'Categoría',
  pluralName: 'Categorías',
  title: 'Categorías',
  link: {
    title: 'Categorias' 
  },
  tabular: {
    columns: [
      { data: 'category', title: 'Categoría' },
      { data: 'subcategory', title: 'Sub-categoria' },
      { data: 'type', title: 'Tipo' },
    ]
  }
});

Products = new orion.collection('products', {
  singularName: 'Producto', 
  pluralName: 'Productos',
  title: 'Productos',
  link: {
    title: 'Productos' 
  },
  tabular: {
    columns: [
      { data: 'name', title: 'Name' },
      { data: 'description', title: 'Descripción' },
    ]
  }
});

Stores = new orion.collection('stores', {
  singularName: 'Tienda', 
  pluralName: 'Tiendas',
  title: 'Tiendas', 
  link: {
    title: 'Tiendas' 
  },
  tabular: {
    columns: [
      { data: 'name', title: 'Name' },
      orion.attributeColumn('user', 'owner', 'Dueño')
    ]
  }
});

Projects = new orion.collection('projects', {
  singularName: 'Proyecto', 
  pluralName: 'Proyectos', 
  title: 'Proyectos',
  link: {
    title: 'Proyectos' 
  },
  tabular: {
    columns: [
      { data: 'name', title: 'Name' },
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
  singularName: 'Diseñador', 
  pluralName: 'Diseñadores', 
  title: 'Diseñadores',
  link: {
    title: 'Diseñadores' 
  },
  tabular: {
    columns: [
      { data: 'name', title: 'Name' },
      { data: 'email', title: 'Email' },
    ]
  }
});

Ads = new orion.collection('ads', {
  singularName: 'anuncio', 
  pluralName: 'anuncios', 
  title: 'Anuncios',
  link: {
    title: 'Anuncios' 
  },
  tabular: {
    columns: [
      { data: 'title', title: 'Titulo' },
      orion.attributeColumn('image', 'image', 'Imagen'),
      { data: 'clicks', title: 'Clicks' },
      { data: 'views', title: 'Vistas' },
    ]
  }
});
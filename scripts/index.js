const products = document.querySelector('#products');
const search = document.querySelector('#search');
const sort = document.querySelector('#sortby');
const collFilter = document.querySelector('#collections');
const cartProducts = document.querySelector('#products-cart');

function fetchData(path, callback, method = 'GET') {
  $.ajax({
    url: `${path}`,
    method,
    dataType: 'json',
    success: function (data) {
      callback(data);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

window.addEventListener('load', function () {
  console.log('Window Load');
  const shop_regex = /^\/shop\.html$/;
  const cart_regex = /^\/cart\.html$/;
  if (
    shop_regex.test(this.window.location.pathname) ||
    cart_regex.test(this.window.location.pathname)
  ) {
    if (!this.localStorage.getItem('cart'))
      localStorage.setItem('cart', JSON.stringify([]));
    localStorage.setItem('searchResult', '');
    localStorage.setItem('sortValue', 'none');
    localStorage.setItem(
      'filterValue',
      JSON.stringify(['1', '2', '3', '4', '5'])
    );

    // fetchData('assets/data/brands.json', setBrands);
    // fetchData('assets/data/collections.json', setCollections);
    // fetchData('assets/data/watches.json', setProducts);

    // mock data
    setBrands([
      {
        id: 1,
        name: 'Seiko',
      },
      {
        id: 2,
        name: 'Omega',
      },
      {
        id: 3,
        name: 'Rolex',
      },
      {
        id: 4,
        name: 'Hublot',
      },
      {
        id: 5,
        name: 'Patek',
      },
    ]);
    setCollections([
      {
        id: 1,
        name: 'Aqua Vent',
      },
      {
        id: 2,
        name: 'Luxe Chron',
      },
      {
        id: 3,
        name: 'Urban Stride',
      },
      {
        id: 4,
        name: 'Over Horizon',
      },
      {
        id: 5,
        name: 'Till Dawn',
      },
    ]);
    setProducts([
      {
        id: 1,
        name: 'Chrono Sport',
        description: 'A sporty chronograph watch perfect for athletes.',
        img: {
          src: 'w1.jpeg',
          alt: 'Chrono Sport',
        },
        material: 'Titanium',
        collection: 3,
        brand: 2,
        price: 200,
      },
      {
        id: 2,
        name: 'Elegant Timepiece',
        description: 'A sleek and sophisticated watch for formal occasions.',
        img: {
          src: 'w2.jpeg',
          alt: 'Elegant Timepiece',
        },
        material: 'Steel',
        collection: 1,
        brand: 4,
        price: 500,
      },
      {
        id: 3,
        name: 'Sporty Diver',
        description: 'A rugged dive watch for underwater adventures.',
        img: {
          src: 'w3.jpeg',
          alt: 'Sporty Diver',
        },
        material: 'Steel',
        collection: 4,
        brand: 3,
        price: 300,
      },
      {
        id: 4,
        name: 'Classic Timepiece',
        description: 'A timeless watch that never goes out of style.',
        img: {
          src: 'w4.jpeg',
          alt: 'Classic Timepiece',
        },
        material: 'Ceramic',
        collection: 2,
        brand: 5,
        price: 600,
      },
      {
        id: 5,
        name: 'Military Style',
        description: 'A tough and durable watch designed for military use.',
        img: {
          src: 'w5.jpeg',
          alt: 'Military Style',
        },
        material: 'Steel',
        collection: 5,
        brand: 1,
        price: 400,
      },
      {
        id: 6,
        name: 'Racing Chronograph',
        description:
          'A high-performance watch designed for speed and accuracy.',
        img: {
          src: 'w6.jpeg',
          alt: 'Racing Chronograph',
        },
        material: 'Titanium',
        collection: 3,
        brand: 2,
        price: 250,
      },
      {
        id: 7,
        name: "Aviator's Watch",
        description: 'A stylish and functional watch designed for pilots.',
        img: {
          src: 'w7.jpeg',
          alt: "Aviator's Watch",
        },
        material: 'Steel',
        collection: 4,
        brand: 3,
        price: 350,
      },
      {
        id: 8,
        name: 'Minimalist Timepiece',
        description:
          'A simple yet elegant watch that pairs well with any outfit.',
        img: {
          src: 'w8.jpeg',
          alt: 'Minimalist Timepiece',
        },
        material: 'Ceramic',
        collection: 2,
        brand: 5,
        price: 450,
      },
      {
        id: 9,
        name: 'Dive Master',
        description: 'A professional-grade dive watch for serious divers.',
        img: {
          src: 'w9.jpeg',
          alt: 'Dive Master',
        },
        material: 'Titanium',
        collection: 5,
        brand: 1,
        price: 700,
      },
      {
        id: 10,
        name: 'Chrono Classic',
        description:
          'A classic chronograph watch that never goes out of style.',
        img: {
          src: 'w10.jpeg',
          alt: 'Chrono Classic',
        },
        material: 'Steel',
        collection: 1,
        brand: 4,
        price: 550,
      },
      {
        id: 11,
        name: 'Smartwatch',
        description:
          'A high-tech watch with advanced features like fitness tracking and mobile connectivity.',
        img: {
          src: 'w11.jpeg',
          alt: 'Smartwatch',
        },
        material: 'Ceramic',
        collection: 3,
        brand: 2,
        price: 800,
      },
      {
        id: 12,
        name: 'Retro Timepiece',
        description:
          'A vintage-style watch with modern features and materials.',
        img: {
          src: 'w12.jpeg',
          alt: 'Retro Timepiece',
        },
        material: 'Steel',
        collection: 4,
        brand: 3,
        price: 400,
      },
      {
        id: 13,
        name: 'Fashionable Watch',
        description:
          'A trendy watch with a unique design that stands out from the crowd.',
        img: {
          src: 'w13.jpeg',
          alt: 'Fashionable Watch',
        },
        material: 'Ceramic',
        collection: 2,
        brand: 5,
        price: 350,
      },
      {
        id: 14,
        name: "Pilot's Chronograph",
        description:
          'A precise and reliable watch designed for aviation enthusiasts.',
        img: {
          src: 'w14.jpeg',
          alt: "Pilot's Chronograph",
        },
        material: 'Titanium',
        collection: 5,
        brand: 1,
        price: 600,
      },
      {
        id: 15,
        name: 'Sleek Timepiece',
        description: 'A sleek and modern watch with minimalist design.',
        img: {
          src: 'w15.jpeg',
          alt: 'Sleek Timepiece',
        },
        material: 'Steel',
        collection: 1,
        brand: 4,
        price: 450,
      },
      {
        id: 16,
        name: 'Luxury Watch',
        description:
          'A high-end watch made from the finest materials and craftsmanship.',
        img: {
          src: 'w16.jpeg',
          alt: 'Luxury Watch',
        },
        material: 'Ceramic',
        collection: 2,
        brand: 1,
        price: 234,
      },
      {
        id: 17,
        name: 'Sporty Chrono',
        description: 'A sporty chronograph watch for athletes and adventurers.',
        img: {
          src: 'w17.jpeg',
          alt: 'Sporty Chrono',
        },
        material: 'Titanium',
        collection: 3,
        brand: 5,
        price: 650,
      },
      {
        id: 18,
        name: 'Classic Dress Watch',
        description:
          'A timeless and elegant watch perfect for formal occasions.',
        img: {
          src: 'w18.jpeg',
          alt: 'Classic Dress Watch',
        },
        material: 'Steel',
        collection: 2,
        brand: 3,
        price: 350,
      },
      {
        id: 19,
        name: 'Rugged Watch',
        description: 'A rugged and durable watch for outdoor enthusiasts.',
        img: {
          src: 'w19.jpeg',
          alt: 'Rugged Watch',
        },
        material: 'Titanium',
        collection: 4,
        brand: 2,
        price: 550,
      },
      {
        id: 20,
        name: 'Minimalist Timepiece',
        description: 'A minimalist watch with clean lines and simple design.',
        img: {
          src: 'w20.jpeg',
          alt: 'Minimalist Timepiece',
        },
        material: 'Ceramic',
        collection: 1,
        brand: 1,
        price: 400,
      },
      {
        id: 21,
        name: 'Aviator Watch',
        description:
          'A classic aviator watch with a rugged and practical design.',
        img: {
          src: 'w21.jpeg',
          alt: 'Aviator Watch',
        },
        material: 'Steel',
        collection: 5,
        brand: 4,
        price: 500,
      },
      {
        id: 22,
        name: 'Fashion Watch',
        description: 'A trendy watch with a bold and colorful design.',
        img: {
          src: 'w22.jpeg',
          alt: 'Fashion Watch',
        },
        material: 'Ceramic',
        collection: 3,
        brand: 3,
        price: 300,
      },
      {
        id: 23,
        name: 'Dressy Timepiece',
        description: 'A dressy watch with a stylish and sophisticated design.',
        img: {
          src: 'w23.jpeg',
          alt: 'Dressy Timepiece',
        },
        material: 'Titanium',
        collection: 2,
        brand: 2,
        price: 450,
      },
      {
        id: 24,
        name: 'The Explorer',
        description: 'A rugged and reliable watch for outdoor adventures.',
        img: { src: 'w24.jpeg', alt: 'The Explorer' },
        material: 'Titanium',
        collection: 4,
        brand: 5,
        price: 650,
      },
      {
        id: 25,
        name: 'Sporty Chrono',
        description: 'A sporty chronograph watch with stopwatch functionality.',
        img: { src: 'w25.jpeg', alt: 'Sporty Chrono' },
        material: 'Steel',
        collection: 3,
        brand: 3,
        price: 500,
      },
    ]);
  }
});

// Brands & Collections
function setBrands(brands) {
  localStorage.setItem('brands', JSON.stringify(brands));
}

function setCollections(collections) {
  let collectionsHtml = '';
  for (let collection of collections) {
    collectionsHtml += `<li class="form-check">
    <input class="coll" checked type="checkbox" id="1" value="${collection.id}" /> ${collection.name} </li>`;
  }
  localStorage.setItem('collections', JSON.stringify(collections));

  collFilter.innerHTML = collectionsHtml;
}

function setProduct(prod, myBrands, myCollections) {
  let prodBrand = myBrands?.find(brand => brand.id === prod.brand)?.name;
  let prodCol = myCollections?.find(col => col.id === prod.collection)?.name;

  return `<div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-3 ">
	<div class="card text-center position-relative watch-card">
		<div class="d-flex justify-content-center align-items-center">
			<img src="assets/images/products/${prod.img.src}" alt="${prod.img.alt}" width="250" class="img-fluid"/>
      </div>
      <h4 class="text-orange h5 mt-3">${prod.name}</h4>
      <h6 class="h5"><b>${prodBrand}</b></h6>
      <p><b>${prodCol}</b></p>
      <p class="h3">${prod.price} &euro;</p>
      <button id="add-to-cart" data-id=${prod.id} class="btn btn-outline-warning">
      Add to cart
    </button>
	  </div>
  </div>`;
}

function setProducts(result) {
  let productsHtml = '';

  if (result?.length === 0) {
    productsHtml = '<h1 class="no-prod"><b>No available products.<b></h1>';
  } else {
    const myBrands = JSON.parse(localStorage.getItem('brands'));
    const myCollections = JSON.parse(localStorage.getItem('collections'));
    for (let i = 0; i < result?.length; i++) {
      productsHtml += setProduct(result[i], myBrands, myCollections);
    }
  }

  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(result));
  }
  products.innerHTML = productsHtml;

  const addCartBtn = document.querySelectorAll('#add-to-cart');
  addCartBtn.forEach(e =>
    e.addEventListener('click', e => {
      const prodId = e.target.attributes['data-id'].value;
      const cartProducts = JSON.parse(localStorage.getItem('cart'));
      const prod = cartProducts.find(p => p.id == prodId);
      if (prod) prod.num++;
      else cartProducts.push({ id: prodId.toString(), num: 1 });
      localStorage.setItem('cart', JSON.stringify(cartProducts));
    })
  );
}

function prepareProducts() {
  const searchResult = localStorage.getItem('searchResult');
  const sortValue = localStorage.getItem('sortValue');
  const filterValue = JSON.parse(localStorage.getItem('filterValue'));

  let myProducts = JSON.parse(localStorage.getItem('products'));

  // Search Results
  myProducts = myProducts?.filter(prod =>
    prod.name.toLowerCase().includes(searchResult)
  );

  // Sort
  switch (sortValue) {
    case 'asc':
      myProducts.sort((a, b) => a.price - b.price);
      break;
    case 'desc':
      myProducts.sort((a, b) => b.price - a.price);
      break;
    case 'basc':
      myProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'bdesc':
      myProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  // Filter
  myProducts = myProducts?.filter(prod =>
    filterValue.includes(prod.collection.toString())
  );

  setProducts(myProducts);
}

// Search EventListener
search.addEventListener('input', e => {
  const searchResult = e.target.value.toLowerCase();
  localStorage.setItem('searchResult', searchResult);
  prepareProducts();
});

// Sort EventListener
sort.addEventListener('change', e => {
  const sortValue = e.target.value;
  localStorage.setItem('sortValue', sortValue);
  prepareProducts();
});

// Filter EventListener
collFilter.addEventListener('change', e => {
  const filterResult = e.target.value;

  const filterValue = JSON.parse(localStorage.getItem('filterValue'));

  const elemIndex = filterValue.indexOf(filterResult);
  if (elemIndex == -1) filterValue.push(filterResult);
  else filterValue.splice(elemIndex, 1);

  localStorage.setItem('filterValue', JSON.stringify(filterValue));

  prepareProducts();
});

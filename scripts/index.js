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

    fetchData('assets/data/brands.json', setBrands);
    fetchData('assets/data/collections.json', setCollections);
    fetchData('assets/data/watches.json', setProducts);
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

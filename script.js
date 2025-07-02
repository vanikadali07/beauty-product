// script.js

const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const productList = document.getElementById('product-list');

categoryFilter.addEventListener('change', filterAndSortProducts);
sortFilter.addEventListener('change', filterAndSortProducts);

function filterAndSortProducts() {
  const category = categoryFilter.value;
  const sortBy = sortFilter.value;

  const allProducts = Array.from(document.querySelectorAll('.product-card'));

  // Filter
  allProducts.forEach(product => {
    const matchesCategory = category === 'all' || product.dataset.category === category;
    product.style.display = matchesCategory ? 'block' : 'none';
  });

  // Sort
  const visibleProducts = allProducts.filter(p => p.style.display === 'block');

  visibleProducts.sort((a, b) => {
    const priceA = parseFloat(a.dataset.price);
    const priceB = parseFloat(b.dataset.price);
    const ratingA = parseFloat(a.dataset.rating);
    const ratingB = parseFloat(b.dataset.rating);

    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'rating') return ratingB - ratingA;
    return 0;
  });

  // Re-append sorted elements
  visibleProducts.forEach(product => productList.appendChild(product));
}

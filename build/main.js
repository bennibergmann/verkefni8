import { formatPrice } from './lib/helpers.js';
import { createCartLine, showCartContent } from './lib/ui.js';

/**
 * @typedef {Object} Product
 * @property {number} id Auðkenni vöru, jákvæð heiltala stærri en 0.
 * @property {string} title Titill vöru, ekki tómur strengur.
 * @property {string} description Lýsing á vöru, ekki tómur strengur.
 * @property {number} price Verð á vöru, jákvæð heiltala stærri en 0.
 */ 

const products = [
  {
    id: 1,
    title: 'HTML húfa',
    description:
      'Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.',
    price: 5_000,
  },
  {
    id: 2,
    title: 'CSS sokkar',
    description: 'Sokkar sem skalast vel með hvaða fótum sem er.',
    price: 3_000,
  },
  {
    id: 3,
    title: 'JavaScript jakki',
    description: 'Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.',
    price: 20_000,
  },
];

/** Bæta vöru í körfu
 * @param {Product} product
 * @param {number} quantity
 */
function addProductToCart(product, quantity) {

  // Hér þarf að finna `<tbody>` í töflu og setja `cartLine` inn í það
  const cartTableBodyElement = document.querySelector('.cart table tbody');

  if (!cartTableBodyElement) {
    console.warn('fann ekki .cart table');
    return;
  }
  
  // TODO hér þarf að athuga hvort lína fyrir vöruna sé þegar til
  const existingLine = cartTableBodyElement.querySelector(`tr[data-cart-product-id="${product.id}"]`);

  if (existingLine) {
    // Uppfæra fjölda og samtals verð.
    const quantityElement = existingLine.querySelector('td:nth-child(2)');
    const totalElement = existingLine.querySelector('td:nth-child(4) .price');

    // Parse-a núverandi fjölda og uppfæra nýja fjölda
    const currentQuantity = parseInt(quantityElement.textContent,10);
    const newQuantity = currentQuantity + quantity;
    quantityElement.textContent = newQuantity.toString();

    // Uppfæra samtals verð
    const totalPrice = product.price * newQuantity;
    totalElement.textContent = formatPrice(totalPrice);
  } else {
    
    // Ef lína fyrir vöru er ekki til nú þegar, búa til nýja
    const cartLine = createCartLine(product, quantity);
    cartTableBodyElement.appendChild(cartLine);
  }
  
  const isCartEmpty = document.querySelector('.cart table tbody').childElementCount === 0;
  showCartContent(!isCartEmpty);

  
  // Sýna efni körfu
  showCartContent(true);

  // TODO sýna/uppfæra samtölu körfu
  updateCartTotal();
}

function updateCartTotal() {
  const cartTableBodyElement = document.querySelector('.cart table tbody');
  const cartTotalElement = document.querySelector('.cart tfoot .price');

  if (!cartTableBodyElement || !cartTotalElement) {
    console.warn('Could not find cart elements');
    return;
  }

  let total = 0;

  const cartLines = cartTableBodyElement.querySelectorAll('tr');
  cartLines.forEach((line) => {
    const priceElement = line.querySelector('.price');
    const quantityElement = line.querySelector('td:nth-child(2)');
    
    if (priceElement && quantityElement) {
      const price = parseInt(priceElement.textContent.replace(/\D/g, ''), 10);
      const quantity = parseInt(quantityElement.textContent, 10);

      total += price * quantity;
    } else {
      console.warn('Could not find price or quantity elements in cart line', line);
    }
  });

  cartTotalElement.textContent = formatPrice(total);
}

function updateCartVisibility() {
  const cartContent = document.querySelector('.cart-content');
  const emptyMessage = document.querySelector('.empty-message');
  const isCartEmpty = document.querySelector('.cart table body').childElementCount === 0;

  if (isCartEmpty) {
    cartContent.classList.add('hidden');
    emptyMessage.classList.remove('hidden');
  } else {
    cartContent.classList.remove('hidden');
    emptyMessage.classList.add('hidden');
  }
}




function submitHandler(event) {
  // Komum í veg fyrir að form submitti
  event.preventDefault();
  
  // Finnum næsta element sem er `<tr>`
  const parent = event.target.closest('tr');

  // Það er með attribute sem tiltekur auðkenni vöru, t.d. `data-product-id="1"`
  const productId = Number.parseInt(parent.dataset.productId,10);

  // Finnum vöru með þessu productId
  const product = products.find((i) => i.id === productId);

  if (!product) {
    return;
  }

  // TODO hér þarf að finna fjölda sem á að bæta við körfu með því að athuga
  // á input
  const quantityInput = parent.querySelector('input[type="number"]');

  const quantity = Math.max(0, parseInt(quantityInput.value, 10));

  // Bætum vöru í körfu (hér væri gott að bæta við athugun á því að varan sé til)
  addProductToCart(product, quantity);
}

// Finna öll form með class="add"
const addToCartForms = document.querySelectorAll('.add')

// Ítra í gegnum þau sem fylki (`querySelectorAll` skilar NodeList)
for (const form of Array.from(addToCartForms)) {
  // Bæta submit event listener við hvert
  form.addEventListener('submit', submitHandler);
}


// TODO bæta við event handler á form sem submittar pöntun
function handlePurchase(event) {
  event.preventDefault(); // Prevent the form from submitting in the traditional way

  // Sækja user input value.
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;

  // Sækja vörur í körfu og samtalsverð.
  const cartItems = document.querySelectorAll('.cart table tbody tr');
  const cartTotal = document.querySelector('.cart tfoot .price').textContent;

  let receiptItemsHTML = `<p>Nafn: ${name}</p><p>Heimilisfang: ${address}</p>`;
  cartItems.forEach(item => {
    const itemName = item.querySelector('td:first-child').textContent;
    const quantity = item.querySelector('td:nth-child(2)').textContent;
    const price = item.querySelector('td:nth-child(4) .price').textContent;

    receiptItemsHTML += `<p>${quantity} x ${itemName} - ${price}</p>`;
  });

  const receiptItemsContainer = document.querySelector('.receipt-items');
  receiptItemsContainer.innerHTML = receiptItemsHTML;

  const receiptTotalContainer = document.querySelector('.receipt-total');
  receiptTotalContainer.textContent = `Samtals: ${cartTotal}`;

  // Fela körfu og vörur.
  document.querySelector('.cart').classList.add('hidden');
  document.querySelector('.products').classList.add('hidden');
  
  // Sýna kvittun.
  document.querySelector('.receipt').classList.remove('hidden');
}


document.querySelector('.purchase-form').addEventListener('submit', handlePurchase);

function showReceipt(show) {
  const receiptSection = document.querySelector('.receipt');
  if (!receiptSection) {
    console.warn('fann ekki .receipt')
    return;
  }
  
  if (show) {
    receiptSection.classList.remove('hidden');
  } else {
    receiptSection.classList.add('hidden');
  }
}
document.addEventListener('DOMContentLoaded', (event) => {
  const purchaseForm = document.querySelector('.purchase-form');
  
  const isCartEmpty = document.querySelector('.cart table tbody').childElementCount === 0;
  showCartContent(!isCartEmpty);

  if (purchaseForm) {
    purchaseForm.removeEventListener('submit', handlePurchase);
    
    purchaseForm.addEventListener('submit', handlePurchase);
  } else {
    console.warn('fann ekki upplýsingar (nafn og heimilisfang)');
  }
});
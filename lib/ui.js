import { formatPrice } from './helpers.js';

function deleteLineFromCart(event) {
  event.preventDefault();
  const lineToDelete = event.submitter.closest('tr');
  lineToDelete.parentElement.removeChild(lineToDelete);

  const isCartEmpty = document.querySelector('.cart table tbody').childElementCount === 0;
  showCartContent(!isCartEmpty);
}

/**
 * Búa til línu í cart töflu.
 * @param {import('../main.js').Product} product 
 * @param {number} quantity 
 * @returns HTMLElement
 */

export function createCartLine(product, quantity) {
  
  // Búa til töflu element.
  const cartLineElement = document.createElement('tr');
  cartLineElement.dataset.cartProductId = product.id.toString();

  // Búa til og append-a titil.
  const titleElement = document.createElement('td');
  titleElement.textContent = product.title;
  cartLineElement.appendChild(titleElement);

  // Búa til og append-a fjölda.
  const quantityElement = document.createElement('td');
  quantityElement.textContent = quantity.toString();
  cartLineElement.appendChild(quantityElement);

  // Búa til og append-a verð. <span> með.
  const priceElement = document.createElement('td');
  const priceSpan = document.createElement('span');
  priceSpan.className = 'price';
  priceSpan.textContent = formatPrice(product.price);
  priceElement.appendChild(priceSpan);
  cartLineElement.appendChild(priceElement);

  // Búa til og append-a samtals verð. <span> með.
  const totalElement = document.createElement('td');
  const totalSpan = document.createElement('span');
  totalSpan.className = 'price';
  totalSpan.textContent = formatPrice(product.price * quantity);
  totalElement.appendChild(totalSpan);
  cartLineElement.appendChild(totalElement);

  // Geta eytt röð úr töflu.
  const deleteElement = document.createElement('td');
  const deleteForm = document.createElement('form');
  deleteForm.className = 'remove';
  deleteForm.method = 'post';
  deleteForm.addEventListener('submit', deleteLineFromCart);
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Eyða';
  deleteForm.appendChild(deleteButton);
  deleteElement.appendChild(deleteForm);
  cartLineElement.appendChild(deleteElement);

  return cartLineElement;
}

/**
 * Sýna efni körfu eða ekki.
 * @param {boolean} Hide Sýna körfu eða ekki
 */

export function showCartContent(show) {
  const cartContent = document.querySelector('.cart-content');
  const emptyMessage = document.querySelector('.empty-message');
  const cartSummary = document.querySelector('.cart tfoot'); 
  const purchaseForm = document.querySelector('.purchase-form');
  const deleteButtons = document.querySelectorAll('.cart tbody form.remove');

  if (show) {
    cartContent.classList.remove('hidden');
    emptyMessage.classList.add('hidden');
    cartSummary.classList.remove('hidden'); 
    purchaseForm.classList.remove('hidden');
    deleteButtons.forEach(button => button.classList.remove('hidden')); 
  } else {
    cartContent.classList.add('hidden');
    emptyMessage.classList.remove('hidden');
    cartSummary.classList.add('hidden');
    purchaseForm.classList.add('hidden'); 
    deleteButtons.forEach(button => button.classList.add('hidden')); 
  }
}




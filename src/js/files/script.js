// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// import { isMobile } from "./functions.js";
// import { formsModules } from "./forms/forms.js";

// Меню Бургер
const iconMenu = document.querySelector('.icon-menu');
const bodyMenu = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener (
		"click", function (e) {
	document.body.classList.toggle('_lock');
	iconMenu.classList.toggle('_active');
	bodyMenu.classList.toggle('_active');
});
}

//=================
window.onload = function () {
   document.addEventListener("click", documentActions);

	// Actions (делегирование события click)
	function documentActions(e) {
      const targetElement = e.target;
      if (targetElement.classList.contains('search-form__icon')) {
			document.querySelector('.search-form').classList.toggle('_active');
		} else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
			document.querySelector('.search-form').classList.remove('_active');
		}
        // Закрывать меню Бургер при клике
			// Если меню Бургер активно
			if(targetElement.classList.contains('icon-menu _active')) {
            // Удалить все добавленные ранее классы
               document.body.classList.remove('_lock');
               iconMenu.classList.remove('_active');
               bodyMenu.classList.remove('_active');
            }
         // // Показать еще
         // if(targetElement.dataset.showmoreButton != null || targetElement.parentNode.dataset.showmoreButton != null) {
         //    document.querySelector('[data-showmore]').classList.toggle('_showmore-active');
         // }

         if (targetElement.classList.contains('actions-card__button')) {
            const productId = targetElement.closest('.items__item').dataset.pid;
            console.log(productId);
            addToCart(targetElement, productId);
            e.preventDefault();
         }

         if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
            if (document.querySelector('.cart-list').children.length > 0) {
               document.querySelector('.cart-header').classList.toggle('_active');
            }
            e.preventDefault();
         } else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-card__button')) {
            document.querySelector('.cart-header').classList.remove('_active');
         }

         if (targetElement.classList.contains('cart-list__delete')) {
            const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
            updateCart(targetElement, productId, false);
            e.preventDefault();
         }

   }

   // AddToCart
	function addToCart(productButton, productId) {
		

			const cart = document.querySelector('.cart-header__icon');
			const product = document.querySelector(`[data-pid="${productId}"]`);
			const productImage = product.querySelector('.card__image');

			updateCart(productButton, productId);
		
	}

   function updateCart(productButton, productId, productAdd = true) {
		const cart = document.querySelector('.cart-header');
		const cartIcon = cart.querySelector('.cart-header__icon');
		const cartQuantity = cartIcon.querySelector('span');
		const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
		const cartList = document.querySelector('.cart-list');

		//Добавляем
      if (productAdd) {
			if (cartQuantity) {
				cartQuantity.innerHTML = ++cartQuantity.innerHTML;
			} else {
				cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
			}
			if (!cartProduct) {
				const product = document.querySelector(`[data-pid="${productId}"]`);
				const cartProductImage = product.querySelector('.card__image').innerHTML;
				const cartProductTitle = product.querySelector('.card__title').innerHTML;
            const cartProductOldPrice = product.querySelector('.card__price-old').innerHTML;
            const cartProductPrice = product.querySelector('.card__price').innerHTML;

				const cartProductContent = `
            <div class="cart-list__body">
               <div class="cart-list__info">
                  <a href="" class="cart-list__image _ibg">${cartProductImage}</a>
                  <div class="cart-list__content">
                     <a href="" class="cart-list__title">${cartProductTitle}</a>
                     <div class="cart-list__old-price old-price"><span>${cartProductOldPrice}</span></div>
                     <div class="cart-list__price">${cartProductPrice}</div>
                  </div>
               </div>
               <div class="cart-list__actions">
                  <div class="cart-list__quantity quantity">Quantity: &nbsp; <span>1</span></div>
                  <div class="cart-list__price">${cartProductPrice}</div>
                  <a href="" class="cart-list__delete _icon-bin"></a>
               </div>
			   </div>`;
				cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`);
			} else {
				const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
				cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
			}
			
      } else {
         const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
			cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
			if (!parseInt(cartProductQuantity.innerHTML)) {
				cartProduct.remove();
			}

			const cartQuantityValue = --cartQuantity.innerHTML;

			if (cartQuantityValue) {
				cartQuantity.innerHTML = cartQuantityValue;
			} else {
				cartQuantity.remove();
				cart.classList.remove('_active');
			}
      }
	}
}
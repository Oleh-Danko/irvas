const modals = (state) => {
	function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
		const trigger = document.querySelectorAll(triggerSelector), 
		      modal = document.querySelector(modalSelector), 
		      close = document.querySelector(closeSelector),
			  windows = document.querySelectorAll('[data-modal]'),
			  scroll = calcScroll();

		trigger.forEach(item => {
			item.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault();
				}

				if (item.getAttribute('data-calc') === 'btn' ) {
					if (state.hasOwnProperty('form') && state.hasOwnProperty('width') && state.hasOwnProperty('height')){
						openModal();
					} else {
						createStatusMessage('[data-calc="btn"]');
					}
				} else if (item.getAttribute('data-calc') === 'btn2') {
					if (state.hasOwnProperty('type') &&  state.hasOwnProperty('profile')) {
						openModal();
					} else {
						createStatusMessage('[data-calc="btn2"]');
					}
				} else {
					openModal();
				}

			});
		});

		function openModal() {
			windows.forEach(item => {
				item.style.display = 'none';
			});

			modal.style.display = 'block';
			document.body.style.overflow = 'hidden';
			document.body.style.marginRight = `${scroll}px`;
		}

		function closeModal() {
			windows.forEach(item => {
				item.style.display = 'none';
			});

			modal.style.display = 'none';
			document.body.style.overflow = '';
			document.body.style.marginRight = `0px`;
		}

		function createStatusMessage(selector) {
		// document.querySelector('.popup_calc_content ').style.border = '12px solid red';
			// item.style.border = '3px solid red';
			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			statusMessage.textContent = 'Введіть всі данні';
			document.querySelector(selector).after(statusMessage);
			setTimeout(() => {
				statusMessage.textContent = '';
			}, 1000);
		}

		close.addEventListener('click', () => {
			closeModal();
		});

		modal.addEventListener('click', (e) => {
			if (e.target === modal && closeClickOverlay) {
				closeModal();
			}
		});	
	}

	function showModalByTime(selector, time) {
		setTimeout(() => {
			document.querySelector(selector).style.display = 'block';
			document.body.style.overflow = 'hidden';
		}, time);
	}

	function calcScroll() {
		let div = document.createElement('div');

		div.style.width = "50px";
		div.style.height = "50px";
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();

		return scrollWidth;
	}

	bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
	bindModal('.phone_link', '.popup', '.popup .popup_close');
	bindModal('.glazing_price_btn ', '.popup_calc ', '.popup_calc_close');
	bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
	bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close');
	// showModalByTime('.popup', 60000);
};

export default modals;
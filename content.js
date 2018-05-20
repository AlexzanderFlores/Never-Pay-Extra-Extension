const neverPayExtra = domain => {
	platform = domain;

	let price;
	let code;
	let query;

	const productData = platforms[platform].getProductData();
	if(productData) {
		price = productData.price;
		code = productData.code;
		query = productData.query;
	}

	if(!query && !code) {
		return;
	}

	let url = 'https://api.neverpayextra.com/v1/search';
	url += `?query=${query}`;
	url += `&platform=${platform}`;
	url += '&limit=1';
	if(price) {
		url += `&price=${price}`;
	}
	if(code) {
		url += `&code=${code}`;
	}

	$.get(url).done(data => {
		let html;

		if(data) {
			const savings = (data.comparePrice - data.price).toFixed(2);

			if(Number(savings) <= 0) {
				console.log('Actual best price found');
				updateHTML('Best Price!', null, 'how-to-track', platforms[platform]);
			} else {
				const display = data.platformDisplay;

				updateHTML(`
					<span>Save $${savings}</span>
					<span>on ${display}</span>
				`, data.url, 'how-to-track', platforms[platform], display, savings, data.productImage);

				$('#never-pay-extra-save-button > span').css('grid-template-rows', '1fr 1fr');
			}
		} else {
			console.log('Could not find a product with the same UPC');
			updateHTML('Best Price!', null, 'how-to-track', platforms[platform]);
		}
	}).fail((xhr, text, error) => {
		console.log('Status', xhr.status);
		console.log('Text', text);
		console.log('Error', error);
	});
};

$(document).ready(() => {
	const domain = location.href.split('/')[2].split('.')[1];

	if(platforms[domain]) {
		NPESet = false;

		const delayedDomains = [
			'chegg', 'target'
		];

		if(delayedDomains.indexOf(domain) >= 0) {
			setTimeout(() => neverPayExtra(domain), 5000);
		} else {
			updateHTML('Finding Deals...', null, 'how-to-track', platforms[domain]);
			neverPayExtra(domain);
		}
	}

	$(document).on('mouseover', '#never-pay-extra-track-button', event => {
		$('#never-pay-extra-tracker-popup').css('height', '240px');
	});

	$(document).on('click', '#never-pay-extra-close-popup', () => {
		$('#never-pay-extra-tracker-popup').css('height', '0');
	});

	$(document).on('click', '#never-pay-extra-login', () => {
		const emailContainer = $('#never-pay-extra-email-phone');
		const passwordContainer = $('#never-pay-extra-password');
		const priceContainer = $('#never-pay-extra-desired-price');

		const email = emailContainer.val();
		const password = passwordContainer.val();
		const price = priceContainer.val();

		if(!emailContainer.val()) {
			emailContainer.focus();
			return;
		}

		if(!passwordContainer.val()) {
			passwordContainer.focus();
			return;
		}

		if(!priceContainer.val() || !$.isNumeric(price)) {
			priceContainer.focus();
			return;
		}

		console.log('Email', `"${email}"`);
		console.log('Password', `"${password}"`);
		console.log('Price', `"${price}"`);
	});
});

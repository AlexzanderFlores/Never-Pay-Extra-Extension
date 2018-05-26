const neverPayExtra = domain => {
	platform = domain;
	$('.never-pay-extra').addClass(`npe-${platform}`);

	const titleBar = $('#titleBar');
	if(titleBar.length) {
		$('.never-pay-extra').addClass(`npe-amazon-title-bar`);
	}

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
		console.log('Not query or code');
		$('.never-pay-extra').remove();
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

	console.log(url);

	$.get(url).done(data => {
		console.log(data);
		let html;

		if(data && data.upc) {
			const savings = (data.comparePrice - data.price).toFixed(2);

			if(Number(savings) <= 0) {
				console.log('Actual best price found');
				updateHTML('Best Price!', null, 'how-to-track', platforms[platform]);
			} else {
				updateHTML(`
					<span class='npe-center-h'>Save $${savings}</span>
				`, `https://www.neverpayextra.com/search?q=${data.upc}&ref=button`, 'how-to-track', platforms[platform], data.platformDisplay, savings, data.images[0], data.upc);
				chrome.runtime.sendMessage({
					query: data.upc,
					savings: savings,
					platform: data.platformDisplay
				});
			}
		} else {
			console.log('Could not find a product with the same UPC');
			updateHTML('Best Price!', null, 'how-to-track', platforms[platform]);
		}
	}).fail((xhr, text, error) => {
		console.log('Status', xhr.status);
		console.log('Text', text);
		console.log('Error', error);
		updateHTML('Best Price!', null, 'how-to-track', platforms[platform]);
	});
};

const isUPC = query => query && query.length === 12 && typeof(query) != 'boolean' && !isNaN(query);

$(document).ready(() => {
	const domain = location.href.split('/')[2].split('.')[1];
	if(domain === 'neverpayextra' || domain === undefined) {
		$('#wrapper').attr('extension-enabled', true);
	} else if(platforms[domain]) {
		NPESet = false;

		const delayedDomains = [
			'chegg', 'target', 'walmart'
		];

		if(delayedDomains.indexOf(domain) >= 0) {
			setTimeout(() => {
				updateHTML('Finding Deals...', null, 'how-to-track', platforms[domain]);
				neverPayExtra(domain);
			}, 5000);
		} else {
			updateHTML('Finding Deals...', null, 'how-to-track', platforms[domain]);
			neverPayExtra(domain);
		}
	}
});

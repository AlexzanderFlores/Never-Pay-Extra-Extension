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

	$.get(url).done(data => {
		let html;

		if(data && data.upc) {
			const savings = +(data.comparePrice - data.price).toFixed(2);
			const percentage = 100 - Math.ceil((data.price * 100) / data.comparePrice);

			if(Number(savings) <= 0) {
				updateHTML('Best Price!', null, 'how-to-track', platforms[platform], data.upc);
			} else {
				let savingsString = 'Money';
				if(savings >= percentage) {
					savingsString = `$${savings}`;
				} else {
					savingsString = `${percentage}%`;
				}

				updateHTML(`
					<span class='npe-center-h'>Save up to ${savingsString}</span>
				`, `https://www.neverpayextra.com/search?q=${data.upc}&ref=button&cp=${data.comparePrice}`,
				'how-to-track', platforms[platform], data.upc, data.cheaperOptions, savings, percentage, data.images[0]);

				chrome.runtime.sendMessage({
					query: data.upc,
					savings: savings,
					percentage,
					price: data.comparePrice,
					platform: data.platformDisplay
				});
			}
		} else {
			updateHTML('Best Price!', null, 'how-to-track', platforms[platform], code || query);
		}
	}).fail((xhr, text, error) => {
		console.log('Status', xhr.status);
		console.log('Text', text);
		console.log('Error', error);
		updateHTML('Best Price!', null, 'how-to-track', platforms[platform], data.upc);
	});
};

const isUPC = query => query && (query.length === 12 || query.length === 13) && typeof(query) != 'boolean' && !isNaN(query);

$(document).ready(() => {
	const domain = location.href.split('/')[2].split('.')[1];
	if(domain === 'neverpayextra' || domain === undefined) {
		$('#wrapper').attr('extension-enabled', true);
	} else if(location.href.startsWith('https://www.amazon.com/promocode/')) {
		// let promoCode = location.href.replace('https://www.amazon.com/promocode/', '');
		// if(promoCode.indexOf('?') >= 0) {
		// 	promoCode = promoCode.split('?')[0];
		// }
		// console.log(promoCode);

		const savings = $('#banner_header .a-size-extra-large b').html().replace('Save ', '');
		console.log(savings);

		const coupon = $('#banner_header .a-size-extra-large').html().split('code ')[1].split(',')[0];
		console.log(coupon);

		let expires = $('.a-size-base.a-color-success').html();
		expires = expires.split('until ')[1].split(' ')[0].split('/');
		const date = `${expires[2]}${expires[0]}${expires[1]}`;
		console.log(date);

		const ASINs = [];
		$('a.a-link-normal').each((index, element) => {
			let href = $(element).attr('href');
			href = href.replace('/dp/', '');
			const ASIN = href.split('?')[0];
			if(ASIN.startsWith('B') && ASINs.indexOf(ASIN) === -1) {
				ASINs.push(ASIN);
			}
		});

		console.log(ASINs);

		$.ajax({
			uri: 'https://api.neverpayextra.com/v1/amazon-coupon',
			method: 'POST',
			data: { savings, coupon, expires, ASINs },
			dataType: 'JSON',
			async: true
		}).done(data => {
			console.log(data);
		}).fail((xhr, text, error) => {
			console.log('Status', xhr.status);
			console.log('Text', text);
			console.log('Error', error);
		});
	} else if(platforms[domain]) {
		NPESet = false;

		const delayedDomains = [
			'chegg',
			'target',
			'walmart',
			'abebooks'
		];

		if(delayedDomains.indexOf(domain) >= 0) {
			setTimeout(() => {
				updateHTML('Finding Deals...', null, 'how-to-track', platforms[domain]);
				neverPayExtra(domain);
			}, 3000);
		} else {
			updateHTML('Finding Deals...', null, 'how-to-track', platforms[domain]);
			neverPayExtra(domain);
		}
	}
});

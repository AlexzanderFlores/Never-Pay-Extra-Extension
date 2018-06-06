platforms.target = {
	name: 'target',
	productHtmlStart: [ '[data-test="product-price"]' ]
};

platforms.target.getProductData = () => {
	let query;

	$('.tabPanel > div > div').find('div').each((index, element) => {
		if($(element).html().trim().startsWith('<b>UPC</b>: ')) {
			query = $(element).html().trim().split(': ')[1];
		}
	});

	if(query) {
		const priceContainer = $(platforms.target.productHtmlStart[0] + ' > span');
		let price = priceContainer.html().replace(/[^0-9.]/g, '');

		return { query, price };
	}
};

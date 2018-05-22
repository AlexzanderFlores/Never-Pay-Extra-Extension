platforms.target = {
	name: 'target',
	productHtmlStart: [
		'[data-test="product-price"]'
	]
};

platforms.target.getProductData = () => {
	let targetUPC;

	$('.tabPanel > div > div').find('div').each((index, element) => {
		if($(element).html().trim().startsWith('<b>UPC</b>: ')) {
			targetUPC = $(element).html().trim().split(': ')[1];
		}
	});

	if(targetUPC) {
		const priceContainer = $(platforms.target.productHtmlStart[0] + ' > span');
		price = priceContainer.html().replace(/[^0-9.]/g, '');
		return {
			query: targetUPC,
			price
		};
	}
};

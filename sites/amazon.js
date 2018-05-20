platforms.amazon = {
	name: 'amazon',
	productHtmlStart: [
		'#mediaPrice_feature_div',
		'#price'
	]
};

platforms.amazon.getProductData = () => {
	const asin = $('#ASIN').val();

	if(asin) {
		try {
			price = $('#priceblock_saleprice').html().replace('$', '');
		} catch(e) {
			price = $('#priceblock_ourprice').html().replace('$', '');
		}
		return {
			code: asin,
			price: price
		};
	}
};

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
			const html = $('#priceblock_ourprice').html();
			if(html.indexOf('>') >= 0) {
				price = '';
				$('#priceblock_ourprice span:not(:first-child)').each((index, object) => {
					const html = $(object).html();
					price += `${html}.`;
				});
				price = price.substring(0, price.length - 1);
			} else {
				price = html.replace('$', '');
			}
		}
		return {
			query: asin,
			code: asin,
			price
		};
	}
};

platforms.bestbuy = {
	name: 'bestbuy',
	productHtmlStart: [ '.price-block' ]
};

platforms.bestbuy.getProductData = () => {
	if(location.href.startsWith('https://www.bestbuy.com/site/searchpage')) {
		return {};
	}
	const query = $('#sku-value').html();

	if(query) {
		const price = $('.priceView-hero-price.priceView-purchase-price span').attr('aria-label').split('$')[1];

		return { query, code: query, price };
	}
};

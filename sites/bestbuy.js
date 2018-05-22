platforms.bestbuy = {
	name: 'bestbuy',
	productHtmlStart: [
		'.price-block'
	]
};

platforms.bestbuy.getProductData = () => {
	if(location.href.startsWith('https://www.bestbuy.com/site/searchpage')) {
		return {};
	}
	const bestBuySku = $('#sku-value').html();

	if(bestBuySku) {
		price = $('.priceView-hero-price.priceView-purchase-price span').attr('aria-label').split('$')[1];
		return {
			code: bestBuySku,
			query: bestBuySku,
			price
		};
	}
};

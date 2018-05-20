platforms.bestbuy = {
	name: 'bestbuy',
	productHtmlStart: [
		'.price-block'
	]
};

platforms.bestbuy.getProductData = () => {
	const bestBuySku = $('#sku-value').html();

	if(bestBuySku) {
		price = $('.pb-hero-price.pb-purchase-price span').attr('aria-label').split('$')[1];
		return {
			code: bestBuySku,
			query: bestBuySku,
			price: price
		};
	}
};

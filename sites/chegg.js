platforms.chegg = {
	name: 'chegg',
	productHtmlStart: [ '.total-price-wrapper' ]
};

platforms.chegg.getProductData = () => {
	let ISBN;
	$('.txt-2.pdp-details-value').each((index, element) => {
		const html = $(element).html();
		if(html && html.length === 13 && typeof(html) != 'boolean' && !isNaN(html)) {
			ISBN = html;
			return false;
		}
	});

	if(ISBN) {
		const price = $('#buy-tab .tab-subtext').html().replace(/[^0-9.]/g, '');
		return { query: ISBN, code: ISBN, price };
	}
};

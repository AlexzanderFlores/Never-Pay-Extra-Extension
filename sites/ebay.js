platforms.ebay = {
	name: 'ebay',
	productHtmlStart: [
		'#vi-lkhdr-v4-plchdr',
		'.actPanel.vi-noborder'
	]
};

platforms.ebay.getProductData = () => {
	let ebayUPC = $('h2[itemprop="gtin13"]').html();

	if(ebayUPC === 'Does not apply') {
		ebayUPC = undefined;
	} else if(ebayUPC) {
		price = $('#prcIsum').attr('content');

		if(!price) {
			try {
				price = $('#orgPrc').html().replace(/[^0-9.]/g, '');
			} catch(e) {
				price = $('#mm-saleDscPrc').html().replace(/[^0-9.]/g, '');
			}
		}

		return {
			query: ebayUPC,
			price: price
		};
	}
};

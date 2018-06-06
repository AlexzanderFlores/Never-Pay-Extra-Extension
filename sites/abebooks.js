platforms.abebooks = {
	name: 'abebooks',
	productHtmlStart: [ '#isbn' ]
};

platforms.abebooks.getProductData = () => {
	let ISBN;
	$('#isbn span').each((index, element) => {
		const html = $(element).html();
		if(html && html.length === 13 && typeof(html) != 'boolean' && !isNaN(html)) {
			ISBN = html;
			return false;
		}
	});

	if(ISBN) {
		const price = $('#book-price').html().replace(/[^0-9.]/g, '');
		console.log('Price', price);
		return { query: ISBN, code: ISBN, price };
	}
};

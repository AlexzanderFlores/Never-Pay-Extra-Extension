platforms.textbooks = {
	name: 'textbooks',
	productHtmlStart: [ '#AddNew', '#AddUsed' ]
};

platforms.textbooks.getProductData = () => {
	const ISBN = $('#bkEAN').html();

	if(ISBN) {
		const price = $('span[itemprop="price"]').html().replace(/[^0-9.]/g, '');
		return { query: ISBN, code: ISBN, price };
	}
};

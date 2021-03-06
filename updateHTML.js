const platforms = {};
let NPESet = false;

updateHTML = (text, npeURL, trackURL, platform, upc, otherListings, savingsAmount, percentage, productImage) => {
	const tag = npeURL ? 'a' : 'div';

	let savingsOne = `Save up to <strong class='npe-strong'>${percentage}%</strong>`;
	let savingsTwo = `with <strong class='npe-strong'>${otherListings}</strong> seller${otherListings === 1 ? '' : 's'}`;
	if(!productImage) {
		productImage = 'https://s3.amazonaws.com/neverpayextra/logo.png';
		savingsOne = `<strong class='npe-strong'>Lowest price found!</strong>`;
		savingsTwo = '';
	}

	const trackUrl = upc ? `https://www.neverpayextra.com/track?upc=${upc}` : null;
	let html = `
		<${tag} id='npe-save-button' class='npe-center' href='${npeURL}' target='_blank'>
			<img src='https://s3.amazonaws.com/neverpayextra/logo.png'>
			<span id='npe-text-container' class='npe-center'>
				${text}
			</span>
			<div class='npe-spacer'></div>
			<div id='npe-product-popup' class='npe-popup npe-center'>
				<span id='npe-inner-product-popup'>
					<img src='${productImage}'>
					<span>
						<span>${savingsOne}</span>
						<span>${savingsTwo}</span>
					</span>
				</span>
			</div>
		</${tag}>`;

		if(isUPC(upc)) {
			html += `
				<div id='npe-track-button' class='npe-center'>
					<a href='${trackUrl}' target='_blank' id='npe-inner-track-button' class='npe-center'>
						<img src='https://s3.amazonaws.com/neverpayextra/logo.png'>
						<span id='npe-track-button-plus'>+</span>
						<span id='npe-track-button-text'>Add to Wishlist</span>
					</a>
					<div class='npe-spacer'></div>
					<div id='npe-tracker-popup' class='npe-popup npe-center'>
						Get notified via email or text message when this product drops below a certain price.
						<a href='${trackUrl}' target='_blank'>
							<button>TRACK PRODUCT</button>
						</a>
					</div>
				</div>
			`;
		}

	let obj;

	if($('.never-pay-extra').length) {
		obj = $('.never-pay-extra');
	} else {
		for(let start of platform.productHtmlStart) {
			obj = $(start);

			if(obj.length > 0) {
				break;
			}
		}

		if(!obj) {
			obj = $(platform.htmlStart);
		}
	}

	let currentHTML = obj.html();
	if(currentHTML && NPESet) {
		$('.never-pay-extra').html(html);
	} else {
		NPESet = true;

		$('.never-pay-extra').html('');

		currentHTML = `
			<div class='never-pay-extra npe-center-v'>
				${html}
			</div>
		`;

		obj.html(obj.html() + currentHTML);
	}
};

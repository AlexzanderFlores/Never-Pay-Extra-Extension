const platforms = {};
let NPESet = false;

updateHTML = (text, productURL, trackURL, platform, savingsPlatform, savingsAmount, productImage, upc) => {
	const tag = productURL ? 'a' : 'div';

	let savingsOne = `Save <strong>$${savingsAmount}</strong>`;
	let savingsTwo = `on <strong>${savingsPlatform}</strong>`;
	if(!productImage) {
		productImage = 'https://s3.amazonaws.com/com.neverpayextra/logo_navbar.png';
		savingsOne = '<strong>Lowest price found!</strong>';
		savingsTwo = '';
	}

	const trackUrl = upc ? `https://www.neverpayextra.com/track?upc=${upc}` : null;
	console.log(trackUrl);

	let html = `
		<${tag} id='npe-save-button' class='npe-center' href='${productURL}' target='_blank'>
			<img src='https://s3.amazonaws.com/com.neverpayextra/logo_navbar.png'>
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
		</${tag}>

		<div id='npe-track-button' class='npe-center'>
			<a href='${trackUrl}' target='_blank' id='npe-inner-track-button' class='npe-center'>
				<img src='https://s3.amazonaws.com/com.neverpayextra/logo_navbar.png'>
				<span id='npe-track-button-plus'>+</span>
				<span id='npe-track-button-text'>Add to Wishlist</span>
			</a>
			<div class='npe-spacer'></div>
			<div id='npe-tracker-popup' class='npe-popup npe-center'>
				Get notified via email or text message when this product drops below a certain price. Manage your tracked products by clicking the icon at the top right of your browser.
				<a href='${trackUrl}' target='_blank'>
					<button>TRACK PRODUCT</button>
				</a>
			</div>
		</div>
	`;

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

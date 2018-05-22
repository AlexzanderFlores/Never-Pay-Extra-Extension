const platforms = {};
let NPESet = false;

updateHTML = (text, productURL, trackURL, platform, savingsPlatform, savingsAmount, productImage) => {
	const tag = productURL ? 'a' : 'div';

	let savingsOne = `Save <strong>$${savingsAmount}</strong>`;
	let savingsTwo = `on <strong>${savingsPlatform}</strong>`;
	if(!productImage) {
		productImage = 'https://s3.amazonaws.com/com.neverpayextra/logo_navbar.png';
		savingsOne = '<strong>Lowest price found!</strong>';
		savingsTwo = '';
	}

	let html = `
		<${tag} id='npe-save-button' class='npe-result' href='${productURL}' target='_blank'>
			<img src='https://s3.amazonaws.com/com.neverpayextra/logo_navbar.png'>
			<span id='npe-text-container'>
				${text}
			</span>
			<div class='npe-spacer'></div>
			<div id='npe-product-popup' class='npe-popup'>
				<span id='npe-inner-product-popup'>
					<img src='${productImage}'>
					<span>
						<span>${savingsOne}</span>
						<span>${savingsTwo}</span>
					</span>
				</span>
			</div>
		</${tag}>

		<div id='npe-track-button'>
			<img src='https://s3.amazonaws.com/com.neverpayextra/logo_navbar.png'>
			<span id='npe-track-button-plus'>+</span>
			<span id='npe-track-button-text'>Add to Wishlist</span>
			<div class='npe-spacer'></div>
			<div id='npe-tracker-popup' class='npe-popup'>
				<span id='npe-close-popup'>X</span>
				<span>Want a lower price? Signup to be notified when this product drops in price:</span>
				<input id='npe-email-phone' type='text' placeholder='Email or Phone'>
				<input id='npe-password' class='npe-weird-offset' type='password' placeholder='Password'>
				<input id='npe-desired-price' class='npe-weird-offset' type='number' placeholder='Desired Price'>
				<button id='npe-login'>LOGIN or SIGNUP</button>
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
			<div class='never-pay-extra'>
				${html}
			</div>
		`;

		obj.html(obj.html() + currentHTML);
	}
};

const platforms = {};
let NPESet = false;

updateHTML = (text, productURL, trackURL, platform, savingsPlatform, savingsAmount, productImage) => {
	const tag = productURL ? 'a' : 'div';

	let html = `
		<${tag} id='never-pay-extra-save-button' class='never-pay-extra-result' href='${productURL}' target='_blank'>
			<img src='https://s3.amazonaws.com/com.neverpayextra/logo_navbar.png'>
			<span id='never-pay-extra-text-container'>
				${text}
			</span>
			<div class='never-pay-extra-spacer'></div>
			<div id='never-pay-extra-product-popup' class='never-pay-extra-popup'>
				<span>We've found a lower price on ${savingsPlatform}! Save $<strong>${savingsAmount}</strong></span>
				<img src='${productImage}'>
			</div>
		</${tag}>

		<div id='never-pay-extra-track-button'>
			<img src='https://s3.amazonaws.com/com.neverpayextra/search-better-deals.png'>
			<div class='never-pay-extra-spacer'></div>
			<div id='never-pay-extra-tracker-popup' class='never-pay-extra-popup'>
				<span id='never-pay-extra-close-popup'>X</span>
				<span>Want a lower price? Signup to be notified when this product drops in price:</span>
				<input id='never-pay-extra-email-phone' type='text' placeholder='Email or Phone'>
				<input id='never-pay-extra-password' class='never-pay-extra-weird-offset' type='password' placeholder='Password'>
				<input id='never-pay-extra-desired-price' class='never-pay-extra-weird-offset' type='number' placeholder='Desired Price'>
				<button id='never-pay-extra-login'>LOGIN or SIGNUP</button>
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

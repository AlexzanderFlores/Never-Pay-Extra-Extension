platforms.walmart = {
  name: 'walmart',
  productHtmlStart: [
    '.product-offer-price'
  ]
};

platforms.walmart.getProductData = () => {
  const price = $('.hf-Bot.hf-PositionedRelative .price-characteristic').html();
  let query;

  $('td > div').each((index, object) => {
    const upc = $(object).html();

    if(isUPC(upc)) {
      query = upc;
    }
  });

  return { query, price };
};

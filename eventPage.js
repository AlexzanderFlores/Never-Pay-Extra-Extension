let query = '';
let comparePrice;

chrome.notifications.onClicked.addListener(function() {
  chrome.tabs.create({ url: `https://www.neverpayextra.com/search?q=${query}&ref=notif&cp=${comparePrice}` }, function() {
    setTimeout(() => chrome.notifications.clear('savingsNotification'), 1500);
  });
});

chrome.runtime.onMessage.addListener(function(req, sender, res) {
  query = req.query;
  comparePrice = req.price;
  chrome.browserAction.setBadgeText({ 'text': `${req.percentage}%`, tabId: sender.tab.id });

  const params = {
    type: 'basic',
    iconUrl: 'media/icon48.png',
    title: `Click Here to Save $${req.savings}!`,
    message: `You can save $${req.savings} (${req.percentage}% OFF) on ${req.platform}
To save, simply click this notification`
  };

  chrome.notifications.create('savingsNotification', params);
});

const scriptSrc = window.customElements ? '/card.min.js' : '/card-polyfilled.min.js';
window.cardComponentLoaded = new Promise((resolve) => {
  const cardJs = document.createElement('script');
  cardJs.crossOrigin = 'anonymous';
  cardJs.src = 'https://p.trellocdn.com' + scriptSrc;
  cardJs.onload = resolve;
  document.head.appendChild(cardJs);
});

window.cardComponentLoaded.then(async () => {
  const idCard = 'CjBy4OpQ';
  const api = 'https://api.trello.com/1/card';
  const opts = {
    fields: 'name,closed,url,badges,idAttachmentCover,labels',
    attachments: 'cover',
    customFields: true,
    customFieldItems: true,
    members: true,
    stickers: true,
  };
  const qs = Object.keys(opts).map((param) => `${param}=${opts[param]}`).join('&');
  const resp = await fetch(`${api}/${idCard}?${qs}`);
  const cardData = await resp.json();

  const containers = ['pirate-card', 'demo-card'];
  containers.forEach((id) => {
    const cardEl = document.createElement('trello-card');
    cardEl.card = cardData;
    cardEl.labeltext = true;
    cardEl.colorblind = true;

    document.getElementById(id).appendChild(cardEl);
  });
});

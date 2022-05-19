const idCard = '5c3e2ec871be6643f85f44a6';
const api = 'https://api.trello.com/1/card';
const opts = {
  fields: 'name,closed,url,badges,idAttachmentCover,labels',
  attachments: 'cover',
  customFields: true,
  customFieldItems: true,
  members: true,
  stickers: true,
};
const qs = Object.keys(opts)
  .map(param => `${param}=${opts[param]}`)
  .join('&');
fetch(`${api}/${idCard}?${qs}`)
.then((resp) => resp.json())
.then((cardData) => {
  const containers = ['demo-card'];
  containers.forEach(id => {
    const cardEl = document.createElement('trello-card');
    cardEl.card = cardData;
    cardEl.labeltext = true;
    cardEl.colorblind = true;

    document.getElementById(id).appendChild(cardEl);
  });
});

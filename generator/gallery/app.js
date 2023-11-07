const galleryEl = document.querySelector('#gallery');

const data = [{
  title: 'aaa',
  description: 'bbbb',
  img: '',
}, {
  title: '111',
  description: '2222',
  img: ''
}];

data.map(datum => {
  datum.price = datum.description.length;
});

const galleryInnerHTML = data.map(datum => {
  return ``;
});

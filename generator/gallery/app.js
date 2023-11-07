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

// data.map() = [1, 2, 3] -> ['11', '22', '33']
// array.join(',')  = '11,22,33'

const galleryInnerHTML = data.map(datum => {
  return `<div class="artwork">
            <img src="${datum.img}">
            <div class="description">
                <h2>${datum.title}</h2>
                <p>${datum.description}</p>
            </div>
        </div>`;
}).join('');



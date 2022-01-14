import './sass/main.scss';

const refs = {
  menuList: document.querySelector('.menu__list'),
  markupMain: document.querySelector('.markup__main'),
};
const baseUrl = 'https://rickandmortyapi.com/api';
function getDataServer(url) {
  return fetch(url).then(response => response.json());
}

getDataServer(baseUrl).then(data => {
  const markup = Object.entries(data)
    .map(([key, value]) => `<li><a href="${value}">${key}</a></li>`)
    .join('');
  refs.menuList.innerHTML = markup;
});
document.addEventListener('click', onClickEvent);

function onClickEvent(e) {
  if (e.target.nodeName !== 'A') return;
  e.preventDefault();
  getDataServer(e.target.href).then(data => {
    console.log(data.results);
    const markupImage = data.results
      .map(character => `<li><img src="${character.image}"></li>`)
      .join('');
    refs.markupMain.innerHTML = markupImage;
  });
}

import './sass/main.scss';

const refs = {
  menuList: document.querySelector('.menu__list'),
  markupMain: document.querySelector('.markup__main'),
  pagination: document.querySelector('.pagination'),
};
const baseUrl = 'https://rickandmortyapi.com/api';

function generatePagination(info) {
  let markup = '';
  let activePage = 1;
  if (info.prev !== null) {
    markup += `<a href="${info.prev}">&lArr;</a>`;
    activePage = parseInt(info.prev.split('=')[1]) + 1;
  }
  console.log(activePage);
  for (let i = 1; i <= info.pages; i++) {
    markup += `<a class="${
      activePage === i ? 'active' : ''
    }" href="${baseUrl}/character?page=${i}">${i}</a>`;
  }

  if (info.next !== null) {
    markup += `<a href="${info.next}">&rArr;</a>`;
  }
  refs.pagination.innerHTML = markup;
}

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
    generatePagination(data.info);
    const markupImage = data.results
      .map(
        character => `<li class="main-item"><img src="${character.image}">
      <ul class="item-list">
<li class="item-text">Name: ${character.name}</li>
<li class="item-text">Gender: ${character.gender}</li>
<li class="item-text">Adress: ${character.origin.name}</li>
<li class="item-text">Species: ${character.species}</li>
<li class="item-text">Status: ${character.status}</li>
</ul>
      </li>`,
      )
      .join('');
    refs.markupMain.innerHTML = markupImage;
  });
}

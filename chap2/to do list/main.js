const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

function onAdd() {
  const text = input.value;
  if (text === '') {
    input.focus();
    return;
  }
  const item = createItem(text);
  items.appendChild(item);
  item.scrollIntoView({ block: 'center', behavior: 'smooth' });
  input.value = '';
  input.focus();
}

function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');

  const name = document.createElement('span');
  name.setAttribute('class', 'item__name');
  name.innerText = text;

  const delBtn = document.createElement('button');
  delBtn.setAttribute('class', 'item__delete');
  delBtn.innerHTML = ` <i class='fas fa-trash-alt'></i>`;
  delBtn.addEventListener('click', () => {
    items.removeChild(itemRow);
  });

  itemRow.appendChild(name);
  itemRow.appendChild(delBtn);

  return itemRow;
}

addBtn.addEventListener('click', (event) => {
  event.preventDefault();
  onAdd();
});

input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    onAdd();
  }
});

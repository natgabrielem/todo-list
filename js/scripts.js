let todoItems = [];

//FUNCAO ADICIONA TODO

function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    }

    todoItems.push(todo);
    console.log('LISTA - ', todoItems);

    // referencia ul no html
    const list = document.querySelector('.js-todo-list');
    list.insertAdjacentHTML('beforeend', `
        <li class="todo-item" data-key="${todo.id}">
            <input id="${todo.id}" type="checkbox"/>
            <label for="${todo.id}" class="tick js-tick"></label>
            <span>${todo.text}</span>
            <button class="delete-todo js-delete-todo">
                <svg>
                    <use href="#delete-icon"></use>
                </svg>
            </button>
        </li>
    `)
}

// FUNCAO CHECA TODO

function checkTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;

    const item = document.querySelector(`[data-key='${key}']`);
    if(todoItems[index].checked){
        item.classList.add('done');
    }else {
        item.classList.remove('done');
    }
}

//VERIFICA EVENTO FORMULARIO E VALOR INPUT

const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('.js-todo-input');
    var text = input.value.trim();
    if(text !== ''){
        addTodo(text);
        input.value = '';
        input.focus();
    }
})

//VERIFICA CLICK E ITEM DA LISTA PARA CHECKAR
const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
    if(event.target.classList.contains('js-tick')){
        const itemKey = event.target.parentElement.dataset.key;
        checkTodo(itemKey)
    }
})
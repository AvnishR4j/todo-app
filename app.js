const input = document.getElementById('todoInput');
const list = document.getElementById('todoList');

let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function render() {
  list.innerHTML = '';
  if (todos.length === 0) {
    list.innerHTML = '<p class="empty">No tasks yet. Add one above!</p>';
    return;
  }
  todos.forEach((todo, i) => {
    const li = document.createElement('li');
    if (todo.done) li.classList.add('done');
    li.innerHTML = `
      <span onclick="toggle(${i})">${todo.text}</span>
      <button class="delete-btn" onclick="remove(${i})">&#x2715;</button>
    `;
    list.appendChild(li);
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, done: false });
  input.value = '';
  render();
}

function toggle(i) {
  todos[i].done = !todos[i].done;
  render();
}

function remove(i) {
  todos.splice(i, 1);
  render();
}

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTodo();
});

render();

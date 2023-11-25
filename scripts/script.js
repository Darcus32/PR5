document.addEventListener('DOMContentLoaded', function() {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');

  const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];

  storedTodos.forEach(todo => {
    addTodoFromStorage(todo);
  });

  todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo();
  });

  function addTodo() {
    const todoText = todoInput.value;
    if (todoText.trim() !== '') {
      const todo = {
        id: Date.now(),
        text: todoText,
        completed: false
      };

      addTodoToStorage(todo); 
      addTodoFromStorage(todo); 
      todoInput.value = '';
    }
  }

  function addTodoFromStorage(todo) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;

    const span = document.createElement('span');
    span.textContent = todo.text;
    if (todo.completed) {
      span.style.textDecoration = 'line-through';
      span.style.color = '#999';
      checkbox.style.display = 'none';
    }

    const deleteBtn = document.createElement('span');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = '❌';

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    checkbox.addEventListener('change', function() {
      todo.completed = !todo.completed;
      updateTodoInStorage(todo);
      if (todo.completed) {
        span.style.textDecoration = 'line-through';
        span.style.color = '#999';
        checkbox.style.display = 'none';
      } else {
        span.style.textDecoration = 'none';
        span.style.color = '#000';
        checkbox.style.display = 'inline';
      }
    });

    deleteBtn.addEventListener('click', function() {
      li.remove();
      deleteTodoFromStorage(todo); 
    });
  }

  function addTodoToStorage(todo) {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    storedTodos.push(todo);
    localStorage.setItem('todos', JSON.stringify(storedTodos));
  }

  function updateTodoInStorage(updatedTodo) {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const updatedTodos = storedTodos.map(todo => {
      if (todo.id === updatedTodo.id) {
        return updatedTodo;
      }
      return todo;
    });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  function deleteTodoFromStorage(todoToDelete) {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const filteredTodos = storedTodos.filter(todo => todo.id !== todoToDelete.id);
    localStorage.setItem('todos', JSON.stringify(filteredTodos));
  }
});

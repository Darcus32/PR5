document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
  
    todoForm.addEventListener('submit', function(event) {
      event.preventDefault();
      addTodo();
    });
  
    function addTodo() {
      const todoText = todoInput.value;
      if (todoText.trim() !== '') {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
  
        const span = document.createElement('span');
        span.textContent = todoText;
  
        const deleteBtn = document.createElement('span');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = '❌';
  
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
  
        todoInput.value = '';
  
        checkbox.addEventListener('change', function() {
          if (checkbox.checked) {
            span.style.textDecoration = 'line-through';
          } else {
            span.style.textDecoration = 'none';
          }
        });
  
        deleteBtn.addEventListener('click', function() {
          li.remove();
        });
  
        span.addEventListener('dblclick', function() {
          const editText = prompt('Edit task:', span.textContent);
          if (editText !== null && editText.trim() !== '') {
            span.textContent = editText;
          }
        });
      }
    }
  });
  
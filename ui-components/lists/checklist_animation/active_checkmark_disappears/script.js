document.addEventListener('DOMContentLoaded', function() {
  const todoList = document.getElementById('todo-list_checkmark_disappears');
  
  const tasks = [
    { id: 1, text: 'Open template', completed: false },
    { id: 2, text: 'Build a to-do list', completed: false },
    { id: 3, text: 'Write something', completed: false },
    { id: 4, text: 'Complete the task', completed: false }
  ];
  
  function renderTasks() {
    todoList.innerHTML = '';
    
    tasks.forEach(task => {
      const li = document.createElement('li');
      
      li.innerHTML = `
        <label for="todo-${task.id}">
          <input id="todo-${task.id}" type="checkbox" ${task.completed ? 'checked' : ''}>
          <span>${task.text}</span>
        </label>
      `;
      
      todoList.appendChild(li);
    });
  }
  
  renderTasks();
});
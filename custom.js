document.addEventListener("DOMContentLoaded", function () {
  loadTodos();
});

function addTodo() {
  var todoText = document.getElementById("addTodoInput").value;
  if (todoText.trim() !== "") {
    var todoList = document.getElementById("todo-list");

    var li = document.createElement("li");
    li.className = "todo-item";

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = toggleCompleted;

    var label = document.createElement("label");
    label.innerText = todoText;

    var editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = editTodo;

    var deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = deleteTodo;

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    saveTodos();

    document.getElementById("addTodoInput").value = "";
  }
}

function toggleCompleted() {
  var listItem = this.parentNode;
  listItem.classList.toggle("completed");
  saveTodos();
}

function deleteTodo() {
  var listItem = this.parentNode;
  listItem.remove();
  saveTodos();
}

function editTodo() {
  var listItem = this.parentNode;
  var label = listItem.querySelector("label");
  var newText = prompt("Edit goal:", label.innerText);

  if (newText !== null && newText.trim() !== "") {
    label.innerText = newText;
    saveTodos();
  }
}

function saveTodos() {
  var todoList = document.getElementById("todo-list");
  var todos = [];
  for (var i = 0; i < todoList.children.length; i++) {
    var listItem = todoList.children[i];
    var todoText = listItem.querySelector("label").innerText;
    var isCompleted = listItem.classList.contains("completed");
    todos.push({ text: todoText, completed: isCompleted });
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  var todoList = document.getElementById("todo-list");
  var storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    var todos = JSON.parse(storedTodos);
    for (var i = 0; i < todos.length; i++) {
      var todo = todos[i];

      var li = document.createElement("li");
      li.className = "todo-item";

      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.onclick = toggleCompleted;
      checkbox.checked = todo.completed;

      var label = document.createElement("label");
      label.innerText = todo.text;

      var editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.className = "edit-btn";
      editBtn.onclick = editTodo;

      var deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.onclick = deleteTodo;

      li.appendChild(checkbox);
      li.appendChild(label);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
    }
  }
}

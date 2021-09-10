const delBtn = document.getElementById("del");
const checkBox = document.getElementById("check-box");

class Todo {
	constructor(title, isCompleted) {
		this.title = title;
		this.isCompleted = isCompleted;
	}
}

class Display {
	static displayTodos() {
		// let StoredTodos = [
		// 	{
		// 		title: "paint",
		// 		isCompleted: true,
		// 	},
		// 	{
		// 		title: "code",
		// 		isCompleted: true,
		// 	},
		// 	{
		// 		title: "Clean the room",
		// 		isCompleted: false,
		// 	},
		// ];

		const todos = Storage.getTodos();
		todos.forEach((todo) => Display.addTodoToUI(todo));
		// todos
		// 	.filter((todo) => todo.isCompleted === true)
		// 	.forEach((todo, index) => Display.deleteCompleted(todo, index));
	}

	static addTodoToUI(todo) {
		const ul = document.getElementById("todo");
		const li = document.createElement("li");
		let checked = "";
		if (todo.isCompleted === true) {
			checked = "checked";
		}

		li.innerHTML = `
		
					<h4>${todo.title}</h4>
					<div class="actions">
						<i class="fas fa-times delete"></i>
						<input type="checkbox" name="" id="check-box" class="check-box" ${checked} />
					</div>
		
		`;
		ul.appendChild(li);
	}

	static deleteTodo(el) {
		if (el.classList.contains("delete")) {
			el.parentElement.parentElement.remove();
		}
	}
	static deleteCompleted(completed) {
		completed.forEach((c) => c.parentElement.parentElement.remove());
	}
	static displayAlert(msg, type) {
		const alertBox = document.createElement("div");
		alertBox.classList.add("alert");
		alertBox.classList.add(`${type}`);
		alertBox.innerHTML = ` <h3>${msg}</h3>`;
		const header = document.getElementById("header");
		header.insertBefore(alertBox, header.lastElementChild);

		setTimeout(() => {
			alertBox.remove();
		}, 3000);
	}
	static clearFlied() {
		document.getElementById("input").value = "";
	}
}
////////////////////////////////////////////////////////////////////
// ? Storage

class Storage {
	static getTodos() {
		let todos = [];
		if (localStorage.getItem("todos") === null) {
			todos = [];
		} else {
			todos = JSON.parse(localStorage.getItem("todos"));
		}
		return todos;
	}
	static addTodo(todo) {
		const todos = Storage.getTodos();
		todos.push(todo);
		localStorage.setItem("todos", JSON.stringify(todos));
	}
	static removeTodo(title) {
		let todos = Storage.getTodos();
		todos = todos.filter((todo) => {
			return todo.title != title;
		});
		localStorage.setItem("todos", JSON.stringify(todos));
	}
	static removeCompleted(complete) {
		let todos = Storage.getTodos();
		todos = complete.forEach((todo) => todo.filter((t) => t.checked != true));
		localStorage.setItem("todos", JSON.stringify(todos));
	}
}

// ! Dead
///////////////////////////////////////////////////////////////////////////////////////////

// Other stuffs
// ? Display

document.addEventListener("DOMContentLoaded", Display.displayTodos);

//? Add todo

//* With add Btn
document.getElementById("add").addEventListener("click", (e) => {
	const title = document.getElementById("input").value;
	if (title === "") {
		Display.displayAlert("Please type in a Todo", "danger");
	} else {
		const todo = new Todo(title, false);
		Display.addTodoToUI(todo);
		// ? storage
		Storage.addTodo(todo);

		Display.displayAlert("Todo Added", "success");
		Display.clearFlied();
	}
});

// * Witheeee Enter key
document.getElementById("input").addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		const title = document.getElementById("input").value;
		if (title === "") {
			Display.displayAlert("Please type in a Todo", "danger");
		} else {
			const todo = new Todo(title, false);
			Display.addTodoToUI(todo);
			Storage.addTodo(todo);
			Display.displayAlert("Todo Added", "success");
			document.getElementById("input").value = "";
			Display.clearFlied();
		}
	}
});

//* Delete Event Btn

const todoUl = document.getElementById("todo");
todoUl.addEventListener("click", (e) => {
	Display.deleteTodo(e.target);
	Storage.removeTodo(e.target.parentElement.previousElementSibling.textContent);
	Display.displayAlert("Todo Deleted", "danger");
});

//* Delete Completed Button
document.getElementById("completed").addEventListener("click", (e) => {
	const checkboxChecked = document.querySelectorAll("#check-box");
	Display.deleteCompleted(
		[...checkboxChecked].filter((check) => check.checked === true)
	);
	Storage.removeCompleted(
		[...checkboxChecked].filter((check) => check.checked === true)
	);
	Display.displayAlert("Completed Todos Deleted", "danger");
});

//* Delete Completed Todo
document.addEventListener("keypress", (e) => {
	const checkboxChecked = document.querySelectorAll("#check-box");
	if (e.ctrlKey === true && e.code === "KeyB") {
		Display.deleteCompleted(
			[...checkboxChecked].filter((check) => check.checked === true)
		);
		Display.displayAlert("Completed Todos Deleted", "danger");
	}
});

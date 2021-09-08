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
		let StoredTodos = [
			{
				title: "paint",
				isCompleted: true,
			},
			{
				title: "code",
				isCompleted: true,
			},
			{
				title: "Clean the room",
				isCompleted: false,
			},
		];

		const todos = StoredTodos;
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
	const todo = new Todo(title, false);
	Display.addTodoToUI(todo);
	document.getElementById("input").value = "";
});

// * Witheeee Enter key
document.getElementById("input").addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		const title = document.getElementById("input").value;
		const todo = new Todo(title, false);
		Display.addTodoToUI(todo);
		document.getElementById("input").value = "";
	}
});

//* Delete Event Btn

const todoUl = document.getElementById("todo");
todoUl.addEventListener("click", (e) => {
	Display.deleteTodo(e.target);
});

//* Delete Completed Button
document.getElementById("completed").addEventListener("click", (e) => {
	const checkboxChecked = document.querySelectorAll("#check-box");
	Display.deleteCompleted(
		[...checkboxChecked].filter((check) => check.checked === true)
	);
});

//* Delete Completed Todo
document.addEventListener("keypress", (e) => {
	const checkboxChecked = document.querySelectorAll("#check-box");
	if (e.ctrlKey === true && e.code === "KeyB") {
		Display.deleteCompleted(
			[...checkboxChecked].filter((check) => check.checked === true)
		);
	}
});

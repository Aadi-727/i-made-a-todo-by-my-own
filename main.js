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
				isCompleted: false,
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
	}

	static addTodoToUI(todo) {
		const ul = document.getElementById("todo");
		const li = document.createElement("li");
		let checked = "";
		if (todo.isCompleted === true) {
			checked = "checked";
		} else {
			checked = "";
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

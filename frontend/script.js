const tbody = document.querySelector("tbody");
const addForm = document.querySelector(".add-form");
const inputTask = document.querySelector(".input-tasks");
//funcao que busca as tasks cadrastada no banco de dados
const fetTasks = async () => {
	const responce = await fetch("http://localhost:3333/tasks");
	const tasks = await responce.json();
	return tasks;
};

const addTasks = async (e) => {
	e.preventDefault();

	const task = { title: inputTask.value };

	await fetch("http://localhost:3333/tasks", {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(task),
	});

    loadTasks();
    inputTask.value = '';
};

const deletTasks = async (id) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'delete',
    })

    loadTasks();
}

const updateTasks = async (task) => {
    const { id, title, status } = task;
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, status}),
        });

        loadTasks();
}

const formateDate = (dateUTC) => {
    const options = {dateStyle: 'long', timeStyle: 'short'}
    const date = new Date(dateUTC).toLocaleString('pt-br', options);
    return date;
}

//funcao que cria o elelmento html
const createElemente = (tag, innerText = "", innerHTML = "") => {
	const element = document.createElement(tag);

	if (innerText) {
		element.innerText = innerText;
	}
	if (innerHTML) {
		element.innerHTML = innerHTML;
	}
	return element;
};

const createSelect = (value) => {
	const options = `
       <option value="pendente">pendente</option>                    		                           	<option value="en andamento">en andamento</option>
	   <option value="concluido">concluido</option>
    `;

	const select = createElemente("select", "", options);
	select.value = value;
	return select;
};

// const task = {
// 	id: 1,
// 	title: "tudo dando serto",
// 	created_at: "00 janeiro 2023",
// 	status: "pendente",
// };

const createRow = (task) => {
	const { id, title, created_at, status } = task;

	const tr = createElemente("tr");
	const tdtitle = createElemente("td", title);
	const tdCreatedAt = createElemente("td", formateDate(created_at));
	const tdStatus = createElemente("td");
	const tdActions = createElemente("td");

	const select = createSelect(status);
    select.addEventListener('change', ({target}) => updateTasks({id, title, created_at, status: target.value}))

	const editButtons = createElemente(
		"button",
		"",
		'<span class="material-symbols-outlined"> edit </span>'
	);
	const deleteButtons = createElemente(
		"button",
		"",
		'<span class="material-symbols-outlined"> delete </span>'
	);
    
    const editForm = createElemente('form')
    const editInput = createElemente('input')
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        updateTasks({id, title: editInput.value, status: status});
    })

    editInput.value = title;

    editForm.appendChild(editInput)
    editButtons.addEventListener('click', () => {
        tdtitle.innerText = '';
        tdtitle.appendChild(editForm)
    })

	editButtons.classList.add("btn-action");
	deleteButtons.classList.add("btn-action");

    deleteButtons.addEventListener('click', () => deletTasks(id));

	tdStatus.appendChild(select);

	tdActions.appendChild(editButtons);
	tdActions.appendChild(deleteButtons);

	tr.appendChild(tdtitle);
	tr.appendChild(tdCreatedAt);
	tr.appendChild(tdStatus);
	tr.appendChild(tdActions);

	return tr;
	//tbody.appendChild(tr);
};
//createRow(task);

const loadTasks = async () => {
	const tasks = await fetTasks();

    tbody.innerHTML = '';
    
	tasks.forEach((task) => {
		const tr = createRow(task);
		tbody.appendChild(tr);
	});
};

addForm.addEventListener("submit", addTasks);

loadTasks();

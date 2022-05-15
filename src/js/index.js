import checklist from './checklist-instance.js';

let now = Date.now();
let date = new Date().getDate();
let hour = new Date().getHours();

const checklistElement = document.querySelector('.checklist');
const checkboxElements = document.querySelectorAll('.checklist li > input');

/**
 * Initialize app
 **/
function init() {
	if (!JSON.parse(localStorage.getItem('checklist'))) {
		checklist.initList();
	}

	const initialList = checklist.retrieveList();
	const { lastRefresh } = initialList;

	populateBoxes(initialList);

	// let result = (now - lastRefresh) / 1000;

	// if (result > 5) {
	// 	uncheckBoxes();
	// 	checklist.resetList();
	// }

	checklistElement.addEventListener('change', changeTaskState);
}

/**
 * Uncheck all list checkboxes
 **/
function uncheckBoxes() {
	checkboxElements.forEach((checkbox) => {
		checkbox.checked = false;
	});
}

/**
 * Populate checkboxes of list
 * @param {Object} list - Checklist
 **/
function populateBoxes(list) {
	let tasksDoneKeys = Object.keys(list.tasks).filter((key) => list.tasks[key]);

	checkboxElements.forEach((checkbox, i) => {
		let currentBoxId = checkbox.id.split('task-').pop();

		if (tasksDoneKeys.includes(currentBoxId)) {
			checkbox.checked = true;
		}
	});
}

/**
 * Add/remove changed task to list
 **/
function changeTaskState(e) {
	const selectedBox = e.target;
	let i = selectedBox.id.split('task-').pop();

	selectedBox.checked 
		? checklist.addTask(i) 
		: checklist.removeTask(i);

	checklist.storeList();
}

init();

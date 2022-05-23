import checklist from './checklist-instance.js';

const now = Date.now();
const currentDate = new Date(now);

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
	const lastRefreshDate = new Date(lastRefresh);

	if (!sameDay(currentDate, lastRefreshDate) && currentDate.getHours() > 4) {
		// reset list every day after 4 o'clock
		uncheckBoxes();
		checklist.resetList();
		checklist.updateProgress();
	}

	populateBoxes(initialList);
	checklist.updateProgress();

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
	let tasksDoneKeys = Object.keys(list.tasks).filter(
		(key) => list.tasks[key]
	);

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

	selectedBox.checked ? checklist.addTask(i) : checklist.removeTask(i);

	checklist.storeList();
	checklist.updateProgress();
}

/**
 * Return boolean representing whether 2 dates are in the same day
 * @param  {Date} d1 Date of day 1
 * @param  {Date} d2 Date of day 2
 * @return {Boolean}
 */
function sameDay(d1, d2) {
	return (
		d1.getFullYear() === d2.getFullYear() &&
		d1.getMonth() === d2.getMonth() &&
		d1.getDate() === d2.getDate()
	);
}

init();

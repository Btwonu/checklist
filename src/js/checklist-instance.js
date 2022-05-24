class Checklist {
	constructor() {
		this.tasks = {};
	}

	addTask(taskId) {
		this.tasks[taskId] = true;
	}

	removeTask(taskId) {
		this.tasks[taskId] = false;
	}

	retrieveTasks() {
		return this.tasks;
	}

	initList() {
		const taskData = {
			tasks: {},
		};
		const taskList = document.querySelectorAll('.checklist ul > li');

		taskList.forEach((taskItem, i) => {
			taskData.tasks[i] = false;
		});

		localStorage.setItem('checklist', JSON.stringify(taskData));
	}

	storeList() {
		let listData = {
			tasks: this.retrieveTasks(),
			lastRefresh: Date.now(),
		};

		localStorage.setItem('checklist', JSON.stringify(listData));
	}

	resetList() {
		localStorage.clear();
	}

	retrieveList() {
		const retreivedList = JSON.parse(localStorage.getItem('checklist'));
		const { tasks } = retreivedList;

		this.tasks = Object.assign({}, tasks);

		return retreivedList;
	}

	updateProgress() {
		const tasksArray = Object.values(this.tasks);
		const tasksTotal = tasksArray.length;
		const tasksDone = tasksArray.filter((val) => val).length;

		let renderMessage = `You have completed ${tasksDone} out of your ${tasksTotal} tasks!`;

		const progressElement = document.querySelector(
			'.js-checklist-progress p'
		);

		if (tasksDone) {
			progressElement.innerText = renderMessage;
			progressElement.classList.add('active');
		} else {
			progressElement.innerText = '';
			progressElement.classList.remove('active');
		}
	}
}

export default new Checklist();

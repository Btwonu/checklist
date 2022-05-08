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
		const listData = {
			tasks: {},
		};

		localStorage.setItem('checklist', JSON.stringify(listData));
	}

	storeList() {
		let listData = {
			tasks: this.retrieveTasks(),
			lastRefresh: Date.now(),
		};

		localStorage.setItem('checklist', JSON.stringify(listData));

		let stored = JSON.parse(localStorage.getItem('checklist'));
	}

	resetList() {
		localStorage.clear();
	}

	retrieveList() {
		return JSON.parse(localStorage.getItem('checklist'));
	}
}

export default new Checklist();

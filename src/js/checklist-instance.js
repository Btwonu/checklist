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
}

export default new Checklist();

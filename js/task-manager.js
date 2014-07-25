
var taskService = angular.module('TaskManagerService', []);

taskService.factory('TaskManager', ['$http', '$q', function($http, $q) {

	var taskManager = {
		tasks: [],
		newTask: function(taskName) {
			var t = new Task(taskName);
			t.start();
			this.tasks.push(t);
		},

		get: function(taskId) {
			for (var i=0; i<this.tasks.length; i++) {
				if (this.tasks[i].id == taskId) return this.tasks[i];
			}
		},

		loadTasks: function() {

		},
		saveTasks: function() {

		}
	}

	return taskManager;

}]);
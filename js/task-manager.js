
var taskService = angular.module('TaskManagerService', []);

taskService.factory('TaskManager', ['$http', '$q', function($http, $q) {

	var taskManager = {
		tasks: [],
		newTask: function(taskName) {
			var t = new Task(taskName);
			t.start();
			this.tasks.push(t);
		},

		loadTasks: function() {

		},
		saveTasks: function() {

		}
	}

	return taskManager;

}]);
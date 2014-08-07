
var taskService = angular.module('TaskManagerService', []);

taskService.factory('TaskManager', ['$http', '$q', function($http, $q) {

	var fs = require('fs');

	var taskManager = {
		tasks: [],
		newTask: function(taskName) {
			var t = new Task(taskName);
			t.start();
			this.tasks.push(t);

			this.saveTasks();
		},

		get: function(taskId) {
			for (var i=0; i<this.tasks.length; i++) {
				if (this.tasks[i].id == taskId) return this.tasks[i];
			}
		},

		loadTasks: function() {
			var buffer = fs.readFileSync('/tasks.dat');
			this.tasks = JSON.parse(buffer.toString());
		},
		saveTasks: function() {
			var buffer = new Buffer(JSON.stringify(this.tasks));
			var fd = fs.openSync('/tasks.dat', 'w+');
			fs.writeSync(fd, buffer, 0, buffer.length, 0);
		}
	}

	return taskManager;

}]);
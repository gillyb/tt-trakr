
var taskService = angular.module('TaskManagerService', []);

taskService.factory('TaskManager', ['$http', '$q', 'Settings', function($http, $q, Settings) {

	var fs = require('fs');
	var settings = Settings.get();

	var taskManager = {
		tasks: [],
		newTask: function(taskName) {
			var t = new Task(taskName);
			if (settings.startRunningImmediately)
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
			var buffer;
			try {
				buffer = fs.readFileSync('./tasks.dat');
			}
			catch (e) {
				if (fs.existsSync('./tasks.dat')) {
					// TODO: display some error message
					// TODO: and explain that we're creating a new file
				}

				buffer = new Buffer('[]');
			}
			var fileTasks = JSON.parse(buffer.toString());
			var tasks = this.tasks;
			fileTasks.forEach(function(task) {
				tasks.push(new Task(task.title).fromJson(task));
			});
			this.tasks = tasks;
		},
		saveTasks: function() {
			var buffer = new Buffer(JSON.stringify(this.tasks));
			var fd = fs.openSync('./tasks.dat', 'w+');
			fs.writeSync(fd, buffer, 0, buffer.length, 0);
		},
		remove: function(taskId) {
			for (var i=0; i<this.tasks.length; i++) {
				if (this.tasks[i].id === taskId)
					this.tasks.splice(i, 1);
			}
		}
	}

	return taskManager;

}]);
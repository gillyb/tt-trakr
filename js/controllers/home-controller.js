
app.controller('HomeController', function($scope, $http, $location, $routeParams, $interval, TaskManager) {

	var nw = require('nw.gui');
	var win = nw.Window.get();

	// TODO: extract this to some global directive
	win.on('close', function() {
		TaskManager.tasks.forEach(function(task) {
			task.pause();
		});
		TaskManager.saveTasks();
		this.close(true);
	});

	$('#new-task').keypress(function(e) {
		if (e.keyCode == 13) {
			$scope.newTask();
		}
	});

	$scope.newTask = function() {
		var taskName = $('#new-task').val();
		TaskManager.newTask(taskName);
		$scope.RunningTasks = TaskManager.tasks;
		$('#new-task').val('');
	};

	$scope.toggleTaskStatus = function(taskId) {
		var task = TaskManager.get(taskId);
		if (task.running) task.pause();
		else task.start();
		$scope.RunningTasks = TaskManager.tasks;
	};

	TaskManager.loadTasks();
	$interval(function() {
		$scope.RunningTasks = TaskManager.tasks;
	}, 1000);

});
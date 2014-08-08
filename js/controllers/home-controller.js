
app.controller('HomeController', function($scope, $http, $location, $routeParams, $interval, $timeout, TaskManager) {

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
			$('#new-task').focus();
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

	$scope.markAsDone = function(taskId) {
		var task = TaskManager.get(taskId);
		task.markAsDone();
		$scope.RunningTasks = TaskManager.tasks;
	};

	function initWindow() {
		$('.running-tasks-container').delegate('.running-task', 'mouseover', function() {
			$(this).find('.mark-as-done').removeClass('hidden');
		})
		$('.running-tasks-container').delegate('.running-task', 'mouseout', function() {
			$(this).find('.mark-as-done').addClass('hidden');
		});
	}

	TaskManager.loadTasks();
	$interval(function() {
		$scope.RunningTasks = TaskManager.tasks;
	}, 1000);
	$timeout(initWindow);

});
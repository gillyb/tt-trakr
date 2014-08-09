
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
			$('#new-task').val('');
			$('#new-task').focus();
		}
	});

	$scope.newTask = function() {
		var taskName = $('#new-task').val();
		TaskManager.newTask(taskName);
		refreshTasks();
	};

	$scope.toggleTaskStatus = function(taskId) {
		var task = TaskManager.get(taskId);
		if (task.running) task.pause();
		else task.start();
		refreshTasks();
	};

	$scope.markAsDone = function(taskId) {
		var task = TaskManager.get(taskId);
		task.markAsDone();
		refreshTasks();
	};
	$scope.removeTask = function(taskId) {
		TaskManager.remove(taskId);
		refreshTasks();
	};

	$scope.minimizeWindow = function() {
		win.minimize();
	};
	$scope.closeWindow = function() {
		win.close();
	};

	function initWindow() {
		$('.running-tasks-container').delegate('.running-task', 'mouseover', function() {
			$(this).find('.mark-as-done').removeClass('hidden');
		})
		$('.running-tasks-container').delegate('.running-task', 'mouseout', function() {
			$(this).find('.mark-as-done').addClass('hidden');
		});
		$('.done-tasks-container').delegate('.done-task', 'mouseover', function() {
			$(this).find('.remove-task').removeClass('hidden');
		});
		$('.done-tasks-container').delegate('.done-task', 'mouseout', function() {
			$(this).find('.remove-task').addClass('hidden');
		});
	}

	function refreshTasks() {
		var runningTasks = [];
		var doneTasks = [];
		TaskManager.tasks.forEach(function(task) {
			if (task.done)
				doneTasks.push(task);
			else
				runningTasks.push(task);
		});
		$scope.RunningTasks = runningTasks;
		$scope.DoneTasks = doneTasks;
	}

	TaskManager.loadTasks();
	$interval(refreshTasks, 1000);
	$timeout(initWindow);

});

app.controller('HomeController', function($scope, $http, $location, $routeParams, $interval, $timeout, TaskManager, Settings) {

	var nw = require('nw.gui');
	var win = nw.Window.get();

	$scope.Settings = Settings.get();

	// TODO: extract this to some global directive
	win.on('close', function() {
		if ($scope.Settings.stopTasksOnClose) {
			TaskManager.tasks.forEach(function(task) {
				task.pause();
			});
		}
		TaskManager.saveTasks();
		this.close();
	});

	$('#new-task').keypress(function(e) {
		if (e.keyCode == 13) {
			$scope.newTask();
		}
	});

	$scope.newTask = function() {
		var taskName = $('#new-task').val().trim();
		if (taskName == '') return;

		TaskManager.newTask(taskName);
		$('#new-task').val('');
		$('#new-task').focus();
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

	$scope.openSettings = function() {
		var settings = Settings.get();
		$('#always-on-top').prop('checked', settings.alwaysOnTop);
		$('#hide-seconds').prop('checked', settings.hideSeconds);
		$('#stop-tasks-on-close').prop('checked', settings.stopTasksOnClose);
		$('#run-task-immediately').prop('checked', settings.startRunningImmediately);
		$('#hide-done').prop('checked', settings.hideDoneTasks);

		$('.backdrop').removeClass('hidden');
		$('.settings-window-container').removeClass('hidden');
	};
	$scope.closeSettings = function() {
		$('.backdrop').addClass('hidden');
		$('.settings-window-container').addClass('hidden');
	};
	$scope.saveSettings = function() {
		var settings = Settings.get();
		settings.alwaysOnTop = $('#always-on-top').is(':checked');
		settings.hideSeconds = $('#hide-seconds').is(':checked');
		settings.stopTasksOnClose = $('#stop-tasks-on-close').is(':checked');
		settings.startRunningImmediately = $('#run-task-immediately').is(':checked');
		settings.hideDoneTasks = $('#hide-done').is(':checked');
		Settings.saveSettings();
		Settings.applySettings(win);

		$scope.Settings = Settings.get();
		$scope.closeSettings();
	};

	function initWindow() {
		$(document).delegate('.running-tasks-container .running-task', 'mouseover', function() {
			$(this).find('.mark-as-done').removeClass('hidden');
		})
		$(document).delegate('.running-tasks-container .running-task', 'mouseout', function() {
			$(this).find('.mark-as-done').addClass('hidden');
		});
		$(document).delegate('.done-tasks-container .done-task', 'mouseover', function() {
			$(this).find('.remove-task').removeClass('hidden');
		});
		$(document).delegate('.done-tasks-container .done-task', 'mouseout', function() {
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

	Settings.applySettings(win);

	TaskManager.loadTasks();
	$interval(refreshTasks, 1000);
	$timeout(initWindow);

});
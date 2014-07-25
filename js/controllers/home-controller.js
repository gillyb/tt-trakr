
app.controller('HomeController', function($scope, $http, $location, $routeParams, $interval, TaskManager) {

	$scope.newTask = function() {
		var taskName = $('#new-task').val();
		TaskManager.newTask(taskName);
		$scope.RunningTasks = TaskManager.tasks;
	};

	$scope.toggleTaskStatus = function(taskId) {
		var task = TaskManager.get(taskId);
		if (task.running) task.pause();
		else task.start();
		$scope.RunningTasks = TaskManager.tasks;
	};

	$interval(function() {
		$scope.RunningTasks = TaskManager.tasks;
	}, 1000);

});
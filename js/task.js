
function Task(title) {

	this.id = this.createId();

	this.startTime = new Date();
	this.endTime;
	this.title = title;
	this.done = false;
	this.running = false;

	var timer;
	this.totalSeconds = 0;

	this.__defineGetter__("timeElapsed", function() {
		var totalSeconds = this.totalSeconds;
		var hours = Math.floor(totalSeconds / 3600);
		var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
		var seconds = Math.floor(totalSeconds - (hours * 3600) - (minutes * 60));
		return hours.toString().padNum(2) + ':' + minutes.toString().padNum(2) + ':' + seconds.toString().padNum(2);
	});

	this.start = function() {
		if (this.running) return;
		var self = this;
		timer = setInterval(function() {
			self.totalSeconds++;
		}, 1000);
		this.running = true;
	};

	this.pause = function() {
		if (!this.running) return;
		clearInterval(timer);
		this.running = false;
	};

	this.markAsDone = function() {
		clearInterval(timer);
		this.running = false;
		this.done = true;
		this.endTime = new Date();
	};
}

Task.prototype.createId = function() {
	function s4() {
    	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  	}
  	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

Task.prototype.fromJson = function(task) {
	this.id = task.id;
	this.title = task.title;
	this.startTime = task.startTime;
	this.endTime = task.endTime;
	this.done = task.done;
	this.running = task.running;
	this.totalSeconds = task.totalSeconds;
	return this;
};
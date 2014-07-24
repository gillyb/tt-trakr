
function Task(title) {

	this.id = this.createId();

	this.startTime = new Date();
	this.endTime;
	this.timeElapsed = 0;
	this.title = title;
	this.done = false;
	this.running = false;

	var timer;

	this.start = function() {
		if (this.running) return;
		var self = this;
		timer = setInterval(function() {
			self.timeElapsed++;
		}, 1000);
		this.running = true;
	};

	this.pause = function() {
		if (!this.running) return;
		clearInterval(timer);
		this.running = false;
	};

	this.done = function() {
		if (!this.running)
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
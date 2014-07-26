
String.prototype.padNum = function(amount) {
	var length = this.length;
	var newString = '';
	for (var i=0; i<amount-length; i++) {
		newString += '0';
	}
	newString += this;
	return newString;
}
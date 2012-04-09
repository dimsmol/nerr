"use strict";
var inherits = require('util').inherits;
var StackKeeper = require('./stack_keeper');


var ErrorBase = function () {
	Error.call(this);
	this.stackKeeper = this.createStackKeeper();
};
inherits(ErrorBase, Error);

ErrorBase.prototype.name = 'ErrorBase';

ErrorBase.prototype.createStackKeeper = function () {
	var result = new StackKeeper();
	Error.captureStackTrace(result, this.constructor);
	return result;
};

ErrorBase.prototype.toString = function () {
	var result = this.name;
	var message = this.getMessage();
	if (message)
	{
		result = [result, this.getMessage()].join(': ');
	}
	return result;
};

ErrorBase.prototype.getMessage = function () {
	return 'Generic error';
};

ErrorBase.prototype.getStackTrace = function () {
	return this.toString() + this.stackKeeper.stack;
};

ErrorBase.prototype.__defineGetter__('stack', function () {
	return this.getStackTrace();
});

ErrorBase.prototype.__defineGetter__('message', function () {
	return this.getMessage();
});


module.exports = ErrorBase;
"use strict";
var inherits = require('inherits');


var ErrorBase = function () {
	Error.call(this);
	this._stackKeeper = this;
	this.captureStackTrace();
};
inherits(ErrorBase, Error);

ErrorBase.prototype.name = 'ErrorBase';

ErrorBase.prototype.captureStackTrace = function () {
	if (Error.captureStackTrace) {
		Error.captureStackTrace(this, this.constructor);
	}
	else {
		var stackKeeper = new Error();
		var self = this;
		stackKeeper.toString = function () { return self.toString(); };
		this._stackKeeper = stackKeeper;
	}
};

ErrorBase.prototype.toString = function () {
	var result = this.name;
	var message = this.getMessage();
	if (message) {
		result = [result, message].join(': ');
	}
	return result;
};

ErrorBase.prototype.getMessage = function () {
	return null;
};

ErrorBase.prototype.getStackTrace = function () {
	return this.getStackTraceInternal();
};

ErrorBase.prototype.getStackTraceInternal = function () {
	return this._stackKeeper.stack;
};

if (Object.defineProperties) {
	Object.defineProperties(ErrorBase.prototype, {
		message: {
			get: function () {
				return this.getMessage();
			}
		},
		stack: {
			get: function () {
				return this.getStackTrace();
			}
		}
	});
}


module.exports = ErrorBase;

/**
 * Javascript reflection is a library to examine, introspect, and modify javascript code structure and behavior at runtime.
 * @module reflection
 */

'use-strict';

/**
 * Get the type name of an object.
 * @param  {Object} obj Object to get the type of.
 * @returns {String} The type name, eg 'object', 'number', 'null', 'undefined', 'regexp', 'array', 'string', 'boolean', 'function', 'date' or 'error'.
 * @static
 * @example
 * const reflection = require('js-reflection');
 * 
 * reflection.typeOf(null);				//'null'
 * reflection.typeOf(undefined);		//'undefined'
 * reflection.typeOf(/\s/g);			//'regexp'
 * reflection.typeOf(true);				//'boolean'
 * reflection.typeOf([]);				//'array'
 * reflection.typeOf(1);				//'number'
 * reflection.typeOf('hello');			//'string'
 * reflection.typeOf(new Date());		//'date'
 * reflection.typeOf(new Error());		//'error'
 * reflection.typeOf(function() {});	//'function'
 */
function typeOf(obj) {

	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

const ReflectionError = {};
ReflectionError.prototype = Object.create(Error.prototype);
ReflectionError.prototype.name = 'ReflectionError';
ReflectionError.prototype.message = '';
ReflectionError.prototype.constructor = null;

/**
 * Create a new meta-object to inspect another object.
 * @param  {Object|Function} obj Object or function to inspect.
 * @static
 * @example
 * const reflection = require('js-reflection');
 * 
 * function testObj() { };
 * testObj.prototype = { hello: 'test', sayHello: function() {} };
 * 
 * const reflectionObj = new reflection.Obj(testObj);
 */
function Obj(obj) {

	if (obj === null || typeOf(obj) !== 'object') {

		throw new ObjNotObjectError();
	}
	this._obj = obj;
}
/**
 * Check for a given property.
 * @param  {string} property Property name to check.
 * @param  {Boolean} includeProtoypye True (default) to look up the prototype chain as well, false to only look at direct object.
 * @return {Boolean} Whether or not the object has the property.
 * @example
 * const reflection = require('js-reflection');
 * 
 * function testObj() { };
 * testObj.prototype = { hello: 'test', sayHello: function() {} };
 * 
 * const reflectionObj = new reflection.Obj(testObj);
 * reflectionObj.hasProperty('hello');			//true
 * reflectionObj.hasProperty('hello', false);	//false
 * reflectionObj.hasProperty('sayHello');		//false
 */
Obj.prototype.hasProperty = function (property, includeProtoypye) {

	return includeProtoypye === undefined || includeProtoypye === true ?
		property in this._obj && typeOf(this._obj[property]) !== 'function' :
		this._obj.hasOwnProperty(property) && typeOf(this._obj[property]) !== 'function';
};
/**
 * Check for a given method.
 * @param  {string} method Method name to check.
 * @param  {Boolean} includeProtoypye True to look up the prototype chain as well, false to only look at direct object.
 * @return {Boolean} Whether or the not the object has the method.
 * @example
 * const reflection = require('js-reflection');
 * 
 * function testObj() { };
 * testObj.prototype = { hello: 'test', sayHello: function() {} };
 * 
 * const reflectionObj = new reflection.Obj(testObj);
 * reflectionObj.hasProperty('sayHello');	//true
 * reflectionObj.hasProperty('hello');		//false
 */
Obj.prototype.hasMethod = function (method, includeProtoypye) {

	return includeProtoypye === undefined || includeProtoypye === true ?
		method in this._obj && typeOf(this._obj[method]) === 'function' :
		this._obj.hasOwnProperty(method) && typeOf(this._obj[method]) === 'function';
};
/**
 * Get the name.
 * @return {string} Object's name.
 * @example
 * const reflection = require('js-reflection');
 * 
 * function testObj() { };
 * testObj.prototype = { hello: 'test', sayHello: function() {} };
 * 
 * const reflectionObj = new reflection.Obj(testObj);
 * reflectionObj.getName();	//'testObj'
 */
Obj.prototype.getName = function () {

	return this._obj.constructor.name;
};
/**
 * Get the constructor.
 * @return {function} Object's constructor.
 * @example
 * const reflection = require('js-reflection');
 * 
 * function testObj() { };
 * testObj.prototype = { hello: 'test', sayHello: function() {} };
 * 
 * const reflectionObj = new reflection.Obj(testObj);
 */
Obj.prototype.getConstructor = function () {

	return this._obj.constructor;
};
/**
 * Get the constructors parameters.
 * @return {Array} Object constructor's parameter names.
 * @example
 * const reflection = require('js-reflection');
 * 
 * function testObj() { };
 * testObj.prototype = { hello: 'test', sayHello: function() {} };
 * 
 * const reflectionObj = new reflection.Obj(testObj);
 * reflectionObj.getConstructor();	// [function]
 */
Obj.prototype.getConstructorParameters = function () {

	return this.getMethodParameters('constructor');
};
/**
 * Get a methods parameters.
 * @param  {string} method Method name.
 * @return {Array} Object method's parameter names.
 * @example
 * const reflection = require('js-reflection');
 * 
 * function testObj(text) { };
 * testObj.prototype = { hello: 'test', sayHello: function() {} };
 * 
 * const reflectionObj = new reflection.Obj(testObj);
 * reflectionObj.getConstructorParameters();	// ['text']
 */
Obj.prototype.getMethodParameters = function (method) {

	if (!this.hasMethod(method, true)) {

		throw new ObjMethodNotExistError();
	}

	return getFunctionParameters(this._obj[method].toString());
};
/**
 * Get all the methods.
 * @param  {Boolean} includeProtoypye True to look up the prototype chain as well, false to only look at direct object.
 * @return {Array} Object method's names.
 * @example
 * const reflection = require('js-reflection');
 * 
 * function testObj() { };
 * testObj.prototype = { hello: 'test', sayHello: function() {} };
 * 
 * const reflectionObj = new reflection.Obj(testObj);
 * reflectionObj.getMethods();		//['sayHello']
 * reflectionObj.getMethods(false);	//[]
 */
Obj.prototype.getMethods = function (includeProtoypye) {

	var methods = [];
	for (const method in this._obj) {

		if (this.hasMethod(method, includeProtoypye)) {

			methods.push(method);
		}
	}
	return methods;
};
/**
 * Get a specific method.
 * @param  {string} method Method name.
 * @param  {Boolean} includeProtoypye True to look up the prototype chain as well, false to only look at direct object.
 * @return {Function} The method.
 * @example
 * const reflection = require('js-reflection');
 * 
 * function testObj() { };
 * testObj.prototype = { hello: 'test', sayHello: function() {} };
 * 
 * const reflectionObj = new reflection.Obj(testObj);
 * reflectionObj.getMethod('sayHello');	//[function]
 */
Obj.prototype.getMethod = function (method, includeProtoypye) {

	if (!this.hasMethod(method, includeProtoypye)) {

		throw new ObjMethodNotExistError();
	}

	return this._obj[method];
};
/**
 * Get all the properties.
 * @param  {Boolean} includeProtoypye True to look up the prototype chain as well, false to only look at direct object.
 * @return {Array} Object properties's names.
 * @example
 * const reflection = require('js-reflection');
 * 
 * function testObj() { };
 * testObj.prototype = { hello: 'test', sayHello: function() {} };
 * 
 * const reflectionObj = new reflection.Obj(testObj);
 * reflectionObj.getProperties();		//['hello']
 * reflectionObj.getProperties(false);	//[]
 */
Obj.prototype.getProperties = function (includeProtoypye) {

	var properties = [];
	for (const prop in this._obj) {

		if (this.hasProperty(prop, includeProtoypye)) {

			properties.push(prop);
		}
	}
	return properties;
};
/**
 * Get a specific property.
 * @param  {string} property Property's name.
 * @param  {Boolean} includeProtoypye True to look up the prototype chain as well, false to only look at direct object.
 * @return {Any} The property.
 * @example
 * const reflection = require('js-reflection');
 * 
 * function testObj() { };
 * testObj.prototype = { hello: 'test', sayHello: function() {} };
 * 
 * const reflectionObj = new reflection.Obj(testObj);
 * reflectionObj.getProperty('hello');	//'test'
 */
Obj.prototype.getProperty = function (property, includeProtoypye) {

	if (!this.hasProperty(property, includeProtoypye)) {

		throw new ObjPropertyNotExistError();
	}

	return this._obj[property];
};

const ObjError = {};
ObjError.prototype = Object.create(ReflectionError.prototype);
ObjError.prototype.name = 'ObjError';
ObjError.prototype.message = '';
ObjError.prototype.constructor = null;

function ObjNotObjectError() {}
ObjNotObjectError.prototype = Object.create(ObjError.prototype);
ObjNotObjectError.prototype.name = 'ReflectionNotObjectError';
ObjNotObjectError.prototype.message = 'Expected an object or function.';
ObjNotObjectError.prototype.constructor = ObjNotObjectError;

function ObjMethodNotExistError() {}
ObjMethodNotExistError.prototype = Object.create(ObjError.prototype);
ObjMethodNotExistError.prototype.name = 'ObjMethodNotExistError';
ObjMethodNotExistError.prototype.message = 'The method does not exist on the object or function.';
ObjMethodNotExistError.prototype.constructor = ObjMethodNotExistError;

function ObjPropertyNotExistError() {}
ObjPropertyNotExistError.prototype = Object.create(ObjError.prototype);
ObjPropertyNotExistError.prototype.name = 'ObjPropertyNotExistError';
ObjPropertyNotExistError.prototype.message = 'The property does not exist on the object or function.';
ObjPropertyNotExistError.prototype.constructor = ObjPropertyNotExistError;

/**
 * Create a new meta-funct to inspect another object.
 * @param  {Function} func Function to inspect.
 * @static
 * @example
 * const reflection = require('js-reflection');
 * 
 * function testFunc() { };
 * 
 * const reflectionFunc = new reflection.Func(testFunc);
 */
function Func(func) {

	if (typeOf(func) !== 'function') {

		throw new FuncNotFunctionError();
	}
	this._func = func;
}
/**
 * Get the name.
 * @return {string} Functions's name.
 * @example
 * const reflection = require('js-reflection');
 * 
 * function testFunc() { };
 * 
 * const reflectionFunc = new reflection.Func(testFunc);
 * reflectionFunc.getName();	//'testFunc'
 */
Func.prototype.getName = function () {

	return this._func.name;
};
/**
 * Get the parameters.
 * @return {Array} Functions's parameter names.
 * @example
 * const reflection = require('js-reflection');
 * 
 * function testFunc(text) { };
 * 
 * const reflectionFunc = new reflection.Func(testFunc);
 * reflectionFunc.getParameters();	//['text']
 */
Func.prototype.getParameters = function () {
	
	return getFunctionParameters(this._func.toString());
};

const FuncError = {};
FuncError.prototype = Object.create(ReflectionError.prototype);
FuncError.prototype.name = 'FuncError';
FuncError.prototype.message = '';
FuncError.prototype.constructor = null;

function FuncNotFunctionError() {}
FuncNotFunctionError.prototype = Object.create(FuncError.prototype);
FuncNotFunctionError.prototype.name = 'FuncNotFunctionError';
FuncNotFunctionError.prototype.message = 'Expected a function.';
FuncNotFunctionError.prototype.constructor = FuncNotFunctionError;

/**
 * Get the parameters.
 * @param  {String} functionSource Function source code.
 * @return {Array} Functions's parameter names.
 * @ignore
 */
function getFunctionParameters(functionSource) {

	const functionRegex = /^function\s*[^(]*\(\s*([^)]*?)\s*\)/m;
	const lambdaRegex = /^\s*\(?\s*([a-zA-Z0-9,]*?)\s*\)?\s*=>/m;
	const commentsRegex = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,)]*))/mg;
	const whitespaceRegex = /\s/g;
	const parameterDelimiter = ',';

	const match = functionSource.match(functionRegex) || functionSource.match(lambdaRegex);
	return match[1].length > 0 ?
		match[1].replace(commentsRegex, '').replace(whitespaceRegex, '').split(parameterDelimiter) :
		[];
}

module.exports = {
	typeOf: typeOf,
	Obj: Obj,
	ObjError: ObjError,
	ObjNotObjectError: ObjNotObjectError,
	ObjMethodNotExistError: ObjMethodNotExistError,
	ObjPropertyNotExistError: ObjPropertyNotExistError,
	Func: Func,
	FuncError: FuncError,
	FuncNotFunctionError: FuncNotFunctionError
};

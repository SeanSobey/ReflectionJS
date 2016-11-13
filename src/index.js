module.exports = (function () {
	'use-strict';

	/**
	 * Get the type name of an object.
	 * @param  {Object} obj Object to get the type of.
	 * @returns {String} The type name, eg 'object', 'number', 'null', 'undefined', 'regexp', 'array', 'string', 'boolean', 'function', 'date' or 'error'.
	 */
	function typeOf(obj) {

		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	}

	/**
	 * Create a new meta-object to inspect another object.
	 * @param  {Object|Function} obj Object or function to inspect.
	 */
	function MetaObject(obj) {

		if (obj === null || typeOf(obj) !== 'object') {

			throw new MetaObjectNotObjectError();
		}
		this._obj = obj;
	}
	/**
	 * Check for a given property.
	 * @param  {string} property Property name to check.
	 * @param  {Boolean} includeProtoypye True to look up the prototype chain as well, false to only look at direct object.
	 * @return {Boolean} Whether or not the object has the property.
	 */
	MetaObject.prototype.hasProperty = function (property, includeProtoypye) {

		return includeProtoypye === undefined || includeProtoypye === true ?
			property in this._obj && typeOf(this._obj[property]) !== 'function' :
			this._obj.hasOwnProperty(property) && typeOf(this._obj[property]) !== 'function';
	};
	/**
	 * Check for a given method.
	 * @param  {string} method Method name to check.
	 * @param  {Boolean} includeProtoypye True to look up the prototype chain as well, false to only look at direct object.
	 * @return {Boolean} Whether or the not the object has the method.
	 */
	MetaObject.prototype.hasMethod = function (method, includeProtoypye) {

		return includeProtoypye === undefined || includeProtoypye === true ?
			method in this._obj && typeOf(this._obj[method]) === 'function' :
			this._obj.hasOwnProperty(method) && typeOf(this._obj[method]) === 'function';
	};
	/**
	 * Get the name.
	 * @return {string} Object's name.
	 */
	MetaObject.prototype.getName = function () {

		return this._obj.constructor.name;
	};
	/**
	 * Get the constructor.
	 * @return {function} Object's constructor.
	 */
	MetaObject.prototype.getConstructor = function () {

		return this._obj.constructor;
	};
	/**
	 * Get the constructors parameters.
	 * @return {Array} Object constructor's parameter names.
	 */
	MetaObject.prototype.getConstructorParameters = function () {

		return this.getMethodParameters('constructor');
	};
	/**
	 * Get a methods parameters.
	 * @param  {string} method Method name.
	 * @return {Array} Object method's parameter names.
	 */
	MetaObject.prototype.getMethodParameters = function (method) {

		if (!this.hasMethod(method, true)) {

			throw new MetaObjectMethodNotExistError();
		}

		return this._obj[method].toString()
			.match(/^function\s*[^(]*\(\s*([^)]*)\)/m)[1]
			.replace(/(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,)]*))/mg, '') // Comments
			.replace(/\s/g, '') // Whitespace
			.split(',');
	};
	/**
	 * Get all the methods.
	 * @param  {Boolean} includeProtoypye True to look up the prototype chain as well, false to only look at direct object.
	 * @return {Array} Object method's names.
	 */
	MetaObject.prototype.getMethods = function (includeProtoypye) {

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
	 */
	MetaObject.prototype.getMethod = function (method, includeProtoypye) {

		if (!this.hasMethod(method, includeProtoypye)) {

			throw new MetaObjectMethodNotExistError();
		}

		return this._obj[method];
	};
	/**
	 * Get all the properties.
	 * @param  {Boolean} includeProtoypye True to look up the prototype chain as well, false to only look at direct object.
	 * @return {Array} Object properties's names.
	 */
	MetaObject.prototype.getProperties = function (includeProtoypye) {

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
	 */
	MetaObject.prototype.getProperty = function (property, includeProtoypye) {

		if (!this.hasProperty(property, includeProtoypye)) {

			throw new MetaObjectPropertyNotExistError();
		}

		return this._obj[property];
	};

	const MetaObjectError = {};
	MetaObjectError.prototype = Object.create(Error.prototype);
	MetaObjectError.prototype.name = 'MetaObjectError';
	MetaObjectError.prototype.message = '';
	MetaObjectError.prototype.constructor = null;

	function MetaObjectNotObjectError() {}
	MetaObjectNotObjectError.prototype = Object.create(MetaObjectError.prototype);
	MetaObjectNotObjectError.prototype.name = 'ReflectionNotObjectError';
	MetaObjectNotObjectError.prototype.message = 'Expected an object or function.';
	MetaObjectNotObjectError.prototype.constructor = MetaObjectNotObjectError;

	function MetaObjectMethodNotExistError() {}
	MetaObjectMethodNotExistError.prototype = Object.create(MetaObjectError.prototype);
	MetaObjectMethodNotExistError.prototype.name = 'MetaObjectMethodNotExistError';
	MetaObjectMethodNotExistError.prototype.message = 'The method does not exist on the object or function.';
	MetaObjectMethodNotExistError.prototype.constructor = MetaObjectMethodNotExistError;

	function MetaObjectPropertyNotExistError() {}
	MetaObjectPropertyNotExistError.prototype = Object.create(MetaObjectError.prototype);
	MetaObjectPropertyNotExistError.prototype.name = 'MetaObjectPropertyNotExistError';
	MetaObjectPropertyNotExistError.prototype.message = 'The property does not exist on the object or function.';
	MetaObjectPropertyNotExistError.prototype.constructor = MetaObjectPropertyNotExistError;

	return {
		typeOf: typeOf,
		MetaObject: MetaObject,
		MetaObjectError: MetaObjectError,
		MetaObjectNotObjectError: MetaObjectNotObjectError,
		MetaObjectMethodNotExistError: MetaObjectMethodNotExistError,
		MetaObjectPropertyNotExistError: MetaObjectPropertyNotExistError
	};
})();

module.exports = (function () {
    'use-strict';

    /**
     * Create a new meta-object to inspect another object.
     * @param  {Object|Function} obj Object or function to inspect.
     */
    function MetaObject(obj) {

        if (obj === null || typeof obj !== 'object') {

            throw new MetaObjectNotObjectError();
        }
        this._obj = obj;
    }
    /**
     * Check if an object has a given property.
     * @param  {string} property Property name to check.
     * @param  {Boolean} includeProtoypye True to look up the prototype chain as well, false to only look at direct object.
     * @return {Boolean}    Whether or not object has the property.
     */
    MetaObject.prototype.hasProperty = function (property, includeProtoypye) {

        return includeProtoypye === undefined || includeProtoypye === true ?
            property in this._obj && typeof this._obj[property] !== 'function' :
            this._obj.hasOwnProperty(property) && typeof this._obj[property] !== 'function';
    };
    /**
     * Check if an this._object has a given method.
     * @param  {string} method Method name to check.
     * @param  {Boolean} includeProtoypye True to look up the prototype chain as well, false to only look at direct this._object.
     * @return {Boolean}    Whether or not this._object has the method.
     */
    MetaObject.prototype.hasMethod = function (method, includeProtoypye) {

        return includeProtoypye === undefined || includeProtoypye === true ?
            method in this._obj && typeof this._obj[method] === 'function' :
            this._obj.hasOwnProperty(method) && typeof this._obj[method] === 'function';
    };
    /**
     * Get an this._object's name.
     * @return {string} Object's name
     */
    MetaObject.prototype.getName = function () {

        return this._obj.constructor.name;
    };
    /**
     * Get an this._object's constructor.
     * @return {function} Object's constructor
     */
    MetaObject.prototype.getConstructor = function () {

        return this._obj.constructor;
    };
    MetaObject.prototype.getConstructorParameters = function () {

        return this.getMethodParameters('constructor');
    };
    MetaObject.prototype.getMethodParameters = function (method) {

        if (!this.hasMethod(method, true)) {

            throw new MetaObjectMethodNotExistError();
        }

        return this._obj[method].toString()
            .match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1]
            .replace(/(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg, '') // Comments   
            .replace(/\s/g, '') // Whitespace         
            .split(',');
    };
    MetaObject.prototype.getMethods = function (includeProtoypye) {

        var methods = [];
        for (let method in this._obj) {

            if (this.hasMethod(method, includeProtoypye)) {

                methods.push(method);
            }
        }
        return methods;
    };
    MetaObject.prototype.getMethod = function (method, includeProtoypye) {

        if (!this.hasMethod(method, includeProtoypye)) {

            throw new MetaObjectMethodNotExistError();
        }

        return this._obj[method];
    };
    MetaObject.prototype.getProperties = function (includeProtoypye) {

        var properties = [];
        for (let prop in this._obj) {

            if (this.hasProperty(prop, includeProtoypye)) {

                properties.push(prop);
            }
        }
        return properties;
    };
    MetaObject.prototype.getProperty = function (property, includeProtoypye) {

        if (!this.hasProperty(property, includeProtoypye)) {

            throw new MetaObjectPropertyNotExistError();
        }

        return this._obj[property];
    };

    function MetaObjectError() {

        throw new Error('This is an abstract type');
    }
    MetaObjectError.prototype = Object.create(Error.prototype);
    MetaObjectError.prototype.name = "MetaObjectError";
    MetaObjectError.prototype.message = "";
    MetaObjectError.prototype.constructor = null;

    function MetaObjectNotObjectError() { }
    MetaObjectNotObjectError.prototype = Object.create(MetaObjectError.prototype);
    MetaObjectNotObjectError.prototype.name = "ReflectionNotObjectError";
    MetaObjectNotObjectError.prototype.message = "Expected an object or function.";
    MetaObjectNotObjectError.prototype.constructor = MetaObjectNotObjectError;

    function MetaObjectMethodNotExistError() { }
    MetaObjectMethodNotExistError.prototype = Object.create(MetaObjectError.prototype);
    MetaObjectMethodNotExistError.prototype.name = "MetaObjectMethodNotExistError";
    MetaObjectMethodNotExistError.prototype.message = "The method does not exist on the object or function.";
    MetaObjectMethodNotExistError.prototype.constructor = MetaObjectMethodNotExistError;

    function MetaObjectPropertyNotExistError() { }
    MetaObjectPropertyNotExistError.prototype = Object.create(MetaObjectError.prototype);
    MetaObjectPropertyNotExistError.prototype.name = "MetaObjectPropertyNotExistError";
    MetaObjectPropertyNotExistError.prototype.message = "The property does not exist on the object or function.";
    MetaObjectPropertyNotExistError.prototype.constructor = MetaObjectPropertyNotExistError;

    return MetaObject;
})();
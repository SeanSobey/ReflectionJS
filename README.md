# ReflectionJS

Javascript reflection is a library to examine, introspect, and modify javascript code structure and behavior at runtime.

## Installation

```
npm install js-reflection
```

## Usage

```JavaScript
const reflection = require('../src/index.js');

function MyObject(param) {

	this.hello = 'Hello World !';

	this.sub = {
		sayHello: function () {
			return 'Hi People !';
		}
	};
}

MyObject.prototype.test = 'test';

MyObject.prototype.sayHello = function (/* A comment */ param1, /* Another comment */ param2 /* A post comment */,
	// a line comment
	param3,
	param4) {

	return this.hello;
};

const myObject = new MyObject();

console.log('hasProperty', new reflection.Obj(myObject).hasProperty('hello'));
console.log('hasMethod', new reflection.Obj(myObject).hasMethod('sayHello'));
console.log('getName', new reflection.Obj(myObject).getName());
console.log('getConstructor', new reflection.Obj(myObject).getConstructor());
console.log('getConstructorParameters', new reflection.Obj(myObject).getConstructorParameters());
console.log('getMethod', new reflection.Obj(myObject).getMethod('sayHello'));
console.log('getMethods', new reflection.Obj(myObject).getMethods());
console.log('getMethodParameters', new reflection.Obj(myObject).getMethodParameters('sayHello'));
console.log('getProperty', new reflection.Obj(myObject).getProperty('hello'));
console.log('getProperties', new reflection.Obj(myObject).getProperties());

function myFunction(/* A comment */ param1, /* Another comment */ param2 /* A post comment */,
	// a line comment
	param3,
	param4) {}

console.log('getName', new reflection.Func(myFunction).getName());
console.log('getParameters', new reflection.Func(myFunction).getParameters());
```

## Documentation

<a name="module_js-reflection"></a>

* [reflection](#module_reflection)
    * _static_
        * [.typeOf(obj)](#module_reflection.typeOf) ⇒ <code>String</code>
        * [.Obj(obj)](#module_reflection.Obj)
            * [.hasProperty(property, includeProtoypye)](#module_reflection.Obj+hasProperty) ⇒ <code>Boolean</code>
            * [.hasMethod(method, includeProtoypye)](#module_reflection.Obj+hasMethod) ⇒ <code>Boolean</code>
            * [.getName()](#module_reflection.Obj+getName) ⇒ <code>string</code>
            * [.getConstructor()](#module_reflection.Obj+getConstructor) ⇒ <code>function</code>
            * [.getConstructorParameters()](#module_reflection.Obj+getConstructorParameters) ⇒ <code>Array</code>
            * [.getMethodParameters(method)](#module_reflection.Obj+getMethodParameters) ⇒ <code>Array</code>
            * [.getMethods(includeProtoypye)](#module_reflection.Obj+getMethods) ⇒ <code>Array</code>
            * [.getMethod(method, includeProtoypye)](#module_reflection.Obj+getMethod) ⇒ <code>function</code>
            * [.getProperties(includeProtoypye)](#module_reflection.Obj+getProperties) ⇒ <code>Array</code>
            * [.getProperty(property, includeProtoypye)](#module_reflection.Obj+getProperty) ⇒ <code>Any</code>
        * [.Func(func)](#module_reflection.Func)
            * [.getName()](#module_reflection.Func+getName) ⇒ <code>string</code>
            * [.getParameters()](#module_reflection.Func+getParameters) ⇒ <code>Array</code>
    * _inner_
        * [~getFunctionParameters(functionSource)](#module_reflection..getFunctionParameters) ⇒ <code>Array</code>

<a name="module_reflection.typeOf"></a>

### reflection.typeOf(obj) ⇒ <code>String</code>
Get the type name of an object.

**Kind**: static method of <code>[reflection](#module_reflection)</code>  
**Returns**: <code>String</code> - The type name, eg 'object', 'number', 'null', 'undefined', 'regexp', 'array', 'string', 'boolean', 'function', 'date' or 'error'.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | Object to get the type of. |

<a name="module_reflection.Obj"></a>

### reflection.Obj(obj)
Create a new meta-object to inspect another object.

**Kind**: static method of <code>[reflection](#module_reflection)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> &#124; <code>function</code> | Object or function to inspect. |


* [.Obj(obj)](#module_reflection.Obj)
    * [.hasProperty(property, includeProtoypye)](#module_reflection.Obj+hasProperty) ⇒ <code>Boolean</code>
    * [.hasMethod(method, includeProtoypye)](#module_reflection.Obj+hasMethod) ⇒ <code>Boolean</code>
    * [.getName()](#module_reflection.Obj+getName) ⇒ <code>string</code>
    * [.getConstructor()](#module_reflection.Obj+getConstructor) ⇒ <code>function</code>
    * [.getConstructorParameters()](#module_reflection.Obj+getConstructorParameters) ⇒ <code>Array</code>
    * [.getMethodParameters(method)](#module_reflection.Obj+getMethodParameters) ⇒ <code>Array</code>
    * [.getMethods(includeProtoypye)](#module_reflection.Obj+getMethods) ⇒ <code>Array</code>
    * [.getMethod(method, includeProtoypye)](#module_reflection.Obj+getMethod) ⇒ <code>function</code>
    * [.getProperties(includeProtoypye)](#module_reflection.Obj+getProperties) ⇒ <code>Array</code>
    * [.getProperty(property, includeProtoypye)](#module_reflection.Obj+getProperty) ⇒ <code>Any</code>

<a name="module_reflection.Obj+hasProperty"></a>

#### obj.hasProperty(property, includeProtoypye) ⇒ <code>Boolean</code>
Check for a given property.

**Kind**: instance method of <code>[Obj](#module_reflection.Obj)</code>  
**Returns**: <code>Boolean</code> - Whether or not the object has the property.  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>string</code> | Property name to check. |
| includeProtoypye | <code>Boolean</code> | True to look up the prototype chain as well, false to only look at direct object. |

<a name="module_reflection.Obj+hasMethod"></a>

#### obj.hasMethod(method, includeProtoypye) ⇒ <code>Boolean</code>
Check for a given method.

**Kind**: instance method of <code>[Obj](#module_reflection.Obj)</code>  
**Returns**: <code>Boolean</code> - Whether or the not the object has the method.  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | Method name to check. |
| includeProtoypye | <code>Boolean</code> | True to look up the prototype chain as well, false to only look at direct object. |

<a name="module_reflection.Obj+getName"></a>

#### obj.getName() ⇒ <code>string</code>
Get the name.

**Kind**: instance method of <code>[Obj](#module_reflection.Obj)</code>  
**Returns**: <code>string</code> - Object's name.  
<a name="module_reflection.Obj+getConstructor"></a>

#### obj.getConstructor() ⇒ <code>function</code>
Get the constructor.

**Kind**: instance method of <code>[Obj](#module_reflection.Obj)</code>  
**Returns**: <code>function</code> - Object's constructor.  
<a name="module_reflection.Obj+getConstructorParameters"></a>

#### obj.getConstructorParameters() ⇒ <code>Array</code>
Get the constructors parameters.

**Kind**: instance method of <code>[Obj](#module_reflection.Obj)</code>  
**Returns**: <code>Array</code> - Object constructor's parameter names.  
<a name="module_reflection.Obj+getMethodParameters"></a>

#### obj.getMethodParameters(method) ⇒ <code>Array</code>
Get a methods parameters.

**Kind**: instance method of <code>[Obj](#module_reflection.Obj)</code>  
**Returns**: <code>Array</code> - Object method's parameter names.  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | Method name. |

<a name="module_reflection.Obj+getMethods"></a>

#### obj.getMethods(includeProtoypye) ⇒ <code>Array</code>
Get all the methods.

**Kind**: instance method of <code>[Obj](#module_reflection.Obj)</code>  
**Returns**: <code>Array</code> - Object method's names.  

| Param | Type | Description |
| --- | --- | --- |
| includeProtoypye | <code>Boolean</code> | True to look up the prototype chain as well, false to only look at direct object. |

<a name="module_reflection.Obj+getMethod"></a>

#### obj.getMethod(method, includeProtoypye) ⇒ <code>function</code>
Get a specific method.

**Kind**: instance method of <code>[Obj](#module_reflection.Obj)</code>  
**Returns**: <code>function</code> - The method.  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | Method name. |
| includeProtoypye | <code>Boolean</code> | True to look up the prototype chain as well, false to only look at direct object. |

<a name="module_reflection.Obj+getProperties"></a>

#### obj.getProperties(includeProtoypye) ⇒ <code>Array</code>
Get all the properties.

**Kind**: instance method of <code>[Obj](#module_reflection.Obj)</code>  
**Returns**: <code>Array</code> - Object properties's names.  

| Param | Type | Description |
| --- | --- | --- |
| includeProtoypye | <code>Boolean</code> | True to look up the prototype chain as well, false to only look at direct object. |

<a name="module_reflection.Obj+getProperty"></a>

#### obj.getProperty(property, includeProtoypye) ⇒ <code>Any</code>
Get a specific property.

**Kind**: instance method of <code>[Obj](#module_reflection.Obj)</code>  
**Returns**: <code>Any</code> - The property.  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>string</code> | Property's name. |
| includeProtoypye | <code>Boolean</code> | True to look up the prototype chain as well, false to only look at direct object. |

<a name="module_reflection.Func"></a>

### reflection.Func(func)
Create a new meta-funct to inspect another object.

**Kind**: static method of <code>[reflection](#module_reflection)</code>  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | Function to inspect. |


* [.Func(func)](#module_reflection.Func)
    * [.getName()](#module_reflection.Func+getName) ⇒ <code>string</code>
    * [.getParameters()](#module_reflection.Func+getParameters) ⇒ <code>Array</code>

<a name="module_reflection.Func+getName"></a>

#### func.getName() ⇒ <code>string</code>
Get the name.

**Kind**: instance method of <code>[Func](#module_reflection.Func)</code>  
**Returns**: <code>string</code> - Functions's name.  
<a name="module_reflection.Func+getParameters"></a>

#### func.getParameters() ⇒ <code>Array</code>
Get the parameters.

**Kind**: instance method of <code>[Func](#module_reflection.Func)</code>  
**Returns**: <code>Array</code> - Functions's parameter names.  
<a name="module_reflection..getFunctionParameters"></a>

### reflection~getFunctionParameters(functionSource) ⇒ <code>Array</code>
Get the parameters.

**Kind**: inner method of <code>[reflection](#module_reflection)</code>  
**Returns**: <code>Array</code> - Functions's parameter names.  

| Param | Type | Description |
| --- | --- | --- |
| functionSource | <code>String</code> | Function source code. |

## Run Tests

```
npm run test
```

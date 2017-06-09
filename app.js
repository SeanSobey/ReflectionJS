'use-strict';
const reflection = require('./index.js');

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

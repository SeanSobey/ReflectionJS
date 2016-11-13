const reflection = require('../src/index.js');

function TestObject(param) {

	this.hello = 'Hello World !';

	this.sub = {
		sayHello: function () {
			return 'Hi People !';
		}
	};

	this.sayHello = function(/* A comment */ param1, /* Another comment */ param2 /* A post comment */,
		// a line comment
		param3,
		param4) {

		return this.hello;
	};
}

TestObject.prototype.goodbye = 'goodbye';

TestObject.prototype.sayGoodbye = function (/* A comment */ param1, /* Another comment */ param2 /* A post comment */,
	// a line comment
	param3) {

	return this.goodbye;
};

// Test the test object :)

const testObject = new TestObject();
testObject.sayHello();
testObject.sayGoodbye();
testObject.sub.sayHello();

// end test

describe('typeOf', function () {

	[
		{ obj: {}, typeName: 'object' },
		{ obj: null, typeName: 'null' },
		{ obj: undefined, typeName: 'undefined' },
		{ obj: /\s/g, typeName: 'regexp' },
		{ obj: [], typeName: 'array' },
		{ obj: 'hello', typeName: 'string' },
		{ obj: true, typeName: 'boolean' },
		{ obj: () => {}, typeName: 'function' },
		{ obj: new Date(), typeName: 'date' },
		{ obj: new Error(), typeName: 'error' },
		{ obj: 1, typeName: 'number' }
	].forEach((test) => {

		it('returns the type name of "' + test.typeName + '"', () => expect(reflection.typeOf(test.obj)).toEqual(test.typeName));
	});
});

describe('MetaObject', function () {

	[
		{ obj: null, typeName: 'null', error: new reflection.MetaObjectNotObjectError()},
		{ obj: undefined, typeName: 'undefined', error: new reflection.MetaObjectNotObjectError()},
		{ obj: /\s/g, typeName: 'regexp', error: new reflection.MetaObjectNotObjectError()},
		{ obj: [], typeName: 'array', error: new reflection.MetaObjectNotObjectError()},
		{ obj: 'hello', typeName: 'string', error: new reflection.MetaObjectNotObjectError()},
		{ obj: true, typeName: 'boolean', error: new reflection.MetaObjectNotObjectError()},
		{ obj: () => {}, typeName: 'function', error: new reflection.MetaObjectNotObjectError()},
		{ obj: new Date(), typeName: 'date', error: new reflection.MetaObjectNotObjectError()},
		{ obj: new Error(), typeName: 'error', error: new reflection.MetaObjectNotObjectError()},
		{ obj: 1, typeName: 'number', error: new reflection.MetaObjectNotObjectError()}
	].forEach((test) => {

		it('throws with an invalid object of type ' + test.typeName, () => expect(() => new reflection.MetaObject(test.obj)).toThrow(test.error));
	});

	describe('hasProperty', () => {

		it('return true for property', () => expect(new reflection.MetaObject(new TestObject()).hasProperty('hello')).toBe(true));

		it('return false for missing property', () => expect(new reflection.MetaObject(new TestObject()).hasProperty('helloo')).toBe(false));

		it('return true for prototype property', () => expect(new reflection.MetaObject(new TestObject()).hasProperty('goodbye')).toBe(true));

		it('return false for function', () => expect(new reflection.MetaObject(new TestObject()).hasProperty('sayHello')).toBe(false));

		it('return false for prototype function', () => expect(new reflection.MetaObject(new TestObject()).hasProperty('sayGoodbye')).toBe(false));

		describe('with includePrototype true', () => {

			it('return true for property', () => expect(new reflection.MetaObject(new TestObject()).hasProperty('hello', true)).toBe(true));

			it('return false for missing property', () => expect(new reflection.MetaObject(new TestObject()).hasProperty('helloo', true)).toBe(false));

			it('return true for prototype property', () => expect(new reflection.MetaObject(new TestObject()).hasProperty('goodbye', true)).toBe(true));

			it('return false for function', () => expect(new reflection.MetaObject(new TestObject()).hasProperty('sayHello', true)).toBe(false));

			it('return false for prototype function', () => expect(new reflection.MetaObject(new TestObject()).hasProperty('sayGoodbye', true)).toBe(false));
		});

		describe('with includePrototype false', () => {

			it('return true for property', () => expect(new reflection.MetaObject(new TestObject()).hasProperty('hello', false)).toBe(true));

			it('return false for missing property', () => expect(new reflection.MetaObject(new TestObject()).hasProperty('helloo', false)).toBe(false));

			it('return false for prototype property', () => expect(new reflection.MetaObject(new TestObject()).hasProperty('goodbye', false)).toBe(false));

			it('return false for function', () => expect(new reflection.MetaObject(new TestObject()).hasProperty('sayHello', false)).toBe(false));

			it('return false for prototype function', () => expect(new reflection.MetaObject(new TestObject()).hasProperty('sayGoodbye', false)).toBe(false));
		});
	});

	describe('hasMethod', () => {

		it('return true for function', () => expect(new reflection.MetaObject(new TestObject()).hasMethod('sayHello')).toBe(true));

		it('return false for missing function', () => expect(new reflection.MetaObject(new TestObject()).hasMethod('sayHelloo')).toBe(false));

		it('return true for prototype function', () => expect(new reflection.MetaObject(new TestObject()).hasMethod('sayGoodbye')).toBe(true));

		it('return false for property', () => expect(new reflection.MetaObject(new TestObject()).hasMethod('hello')).toBe(false));

		it('return false for prototype property', () => expect(new reflection.MetaObject(new TestObject()).hasMethod('goodbye')).toBe(false));

		describe('with includePrototype true', () => {

			it('return true for function', () => expect(new reflection.MetaObject(new TestObject()).hasMethod('sayHello', true)).toBe(true));

			it('return false for missing function', () => expect(new reflection.MetaObject(new TestObject()).hasMethod('sayHelloo', true)).toBe(false));

			it('return true for prototype function', () => expect(new reflection.MetaObject(new TestObject()).hasMethod('sayGoodbye', true)).toBe(true));

			it('return false for property', () => expect(new reflection.MetaObject(new TestObject()).hasMethod('hello', true)).toBe(false));

			it('return false for prototype property', () => expect(new reflection.MetaObject(new TestObject()).hasMethod('goodbye', true)).toBe(false));
		});

		describe('with includePrototype false', () => {

			it('return true for function', () => expect(new reflection.MetaObject(new TestObject()).hasMethod('sayHello', false)).toBe(true));

			it('return false for missing function', () => expect(new reflection.MetaObject(new TestObject()).hasMethod('sayHelloo', false)).toBe(false));

			it('return false for prototype function', () => expect(new reflection.MetaObject(new TestObject()).hasMethod('sayGoodbye', false)).toBe(false));

			it('return false for property', () => expect(new reflection.MetaObject(new TestObject()).hasMethod('hello', false)).toBe(false));

			it('return false for prototype property', () => expect(new reflection.MetaObject(new TestObject()).hasMethod('goodbye', false)).toBe(false));
		});
	});

	describe('getName', () => {

		it('to return the name', () => expect(new reflection.MetaObject(new TestObject()).getName()).toBe('TestObject'));
	});

	describe('getConstructor', () => {

		it('to return a function', () => expect(new reflection.MetaObject(new TestObject()).getConstructor('hello')).toEqual(jasmine.any(Function)));

		it('to return the constructor function', () => expect(new reflection.MetaObject(new TestObject()).getConstructor('hello')).toEqual(TestObject));
	});

	describe('getConstructorParameters', () => {

		it('return the constructor parameters', () => expect(new reflection.MetaObject(new TestObject()).getConstructorParameters()).toEqual(['param']));
	});

	describe('getMethodParameters', () => {

		it('throws when the function doesn\'t exist', () => expect(() => new reflection.MetaObject(new TestObject()).getMethodParameters('sayHelloo')).toThrow(new reflection.MetaObjectMethodNotExistError()));

		it('returns a functions\' parameters', () => expect(new reflection.MetaObject(new TestObject()).getMethodParameters('sayHello')).toEqual(['param1', 'param2', 'param3', 'param4']));

		it('returns a prototype functions\' parameters', () => expect(new reflection.MetaObject(new TestObject()).getMethodParameters('sayGoodbye')).toEqual(['param1', 'param2', 'param3']));
	});

	describe('getMethods', () => {

		it('return all functions\' names', () => expect(new reflection.MetaObject(new TestObject()).getMethods()).toEqual(['sayHello', 'sayGoodbye']));
	});

	describe('getMethod', () => {

		it('throws when the function doesn\'t exist', () => expect(() => new reflection.MetaObject(new TestObject()).getMethod('sayHelloo')).toThrow(new reflection.MetaObjectMethodNotExistError()));

		it('returns the function', () => expect(new reflection.MetaObject(new TestObject()).getMethod('sayHello')).toEqual(jasmine.any(Function)));

		it('returns the prototype function', () => expect(new reflection.MetaObject(new TestObject()).getMethod('sayGoodbye')).toEqual(jasmine.any(Function)));
	});

	describe('getProperties', () => {

		it('return all properties\' names', () => expect(new reflection.MetaObject(new TestObject()).getProperties()).toEqual(['hello', 'sub', 'goodbye']));
	});

	describe('getProperty', () => {

		it('throws when the property doesn\'t exist', () => expect(() => new reflection.MetaObject(new TestObject()).getProperty('helloo')).toThrow(new reflection.MetaObjectPropertyNotExistError()));

		it('returns the property', () => expect(new reflection.MetaObject(new TestObject()).getProperty('hello')).toEqual(jasmine.any(String)));
	});
});

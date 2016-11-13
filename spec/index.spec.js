const reflection = require('../src/index.js');

function TestObject(param) {

	this.hello = 'Hello World!';

	this.sub = {
		sayHello: function () {
			return 'Hi People!';
		}
	};

	this.sayHello = function (/* A comment */ param1a, /* Another comment */ param2a /* A post comment */,
		// a line comment
		param3a,
		param4a) {

		return this.hello;
	};

	this.sayHi = (/* A comment */ param1b, /* Another comment */ param2b /* A post comment */,
		// a line comment
		param3b,
		param4b) => {

		return 'Hi!';
	};
}

TestObject.prototype.goodbye = 'goodbye';

TestObject.prototype.sayGoodbye = function (/* A comment */ param1c, /* Another comment */ param2c /* A post comment */,
	// a line comment
	param3c,
	param4c) {

	return this.goodbye;
};

TestObject.prototype.sayCheers = (/* A comment */ param1d, /* Another comment */ param2d /* A post comment */,
	// a line comment
	param3d,
	param4d) => {

	return 'Cheers!';
};

// Test the test object :)

const testObject = new TestObject();
testObject.sayHello();
testObject.sayHi();
testObject.sayGoodbye();
testObject.sayCheers();
testObject.sub.sayHello();

// end test

describe('typeOf', () => {

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

describe('Obj', () => {

	[
		{ obj: null, typeName: 'null', error: new reflection.ObjNotObjectError()},
		{ obj: undefined, typeName: 'undefined', error: new reflection.ObjNotObjectError()},
		{ obj: /\s/g, typeName: 'regexp', error: new reflection.ObjNotObjectError()},
		{ obj: [], typeName: 'array', error: new reflection.ObjNotObjectError()},
		{ obj: 'hello', typeName: 'string', error: new reflection.ObjNotObjectError()},
		{ obj: true, typeName: 'boolean', error: new reflection.ObjNotObjectError()},
		{ obj: () => {}, typeName: 'function', error: new reflection.ObjNotObjectError()},
		{ obj: new Date(), typeName: 'date', error: new reflection.ObjNotObjectError()},
		{ obj: new Error(), typeName: 'error', error: new reflection.ObjNotObjectError()},
		{ obj: 1, typeName: 'number', error: new reflection.ObjNotObjectError()}
	].forEach((test) => {

		it('throws with an invalid object of type ' + test.typeName, () => expect(() => new reflection.Obj(test.obj)).toThrow(test.error));
	});

	describe('hasProperty', () => {

		it('returns true for property', () => expect(new reflection.Obj(new TestObject()).hasProperty('hello')).toBe(true));

		it('returns false for missing property', () => expect(new reflection.Obj(new TestObject()).hasProperty('helloo')).toBe(false));

		it('returns true for prototype property', () => expect(new reflection.Obj(new TestObject()).hasProperty('goodbye')).toBe(true));

		it('returns false for function', () => expect(new reflection.Obj(new TestObject()).hasProperty('sayHello')).toBe(false));

		it('returns false for prototype function', () => expect(new reflection.Obj(new TestObject()).hasProperty('sayGoodbye')).toBe(false));

		describe('with includePrototype true', () => {

			it('returns true for property', () => expect(new reflection.Obj(new TestObject()).hasProperty('hello', true)).toBe(true));

			it('returns false for missing property', () => expect(new reflection.Obj(new TestObject()).hasProperty('helloo', true)).toBe(false));

			it('returns true for prototype property', () => expect(new reflection.Obj(new TestObject()).hasProperty('goodbye', true)).toBe(true));

			it('returns false for function', () => expect(new reflection.Obj(new TestObject()).hasProperty('sayHello', true)).toBe(false));

			it('returns false for prototype function', () => expect(new reflection.Obj(new TestObject()).hasProperty('sayGoodbye', true)).toBe(false));
		});

		describe('with includePrototype false', () => {

			it('returns true for property', () => expect(new reflection.Obj(new TestObject()).hasProperty('hello', false)).toBe(true));

			it('returns false for missing property', () => expect(new reflection.Obj(new TestObject()).hasProperty('helloo', false)).toBe(false));

			it('returns false for prototype property', () => expect(new reflection.Obj(new TestObject()).hasProperty('goodbye', false)).toBe(false));

			it('returns false for function', () => expect(new reflection.Obj(new TestObject()).hasProperty('sayHello', false)).toBe(false));

			it('returns false for prototype function', () => expect(new reflection.Obj(new TestObject()).hasProperty('sayGoodbye', false)).toBe(false));
		});
	});

	describe('hasMethod', () => {

		it('returns true for function', () => expect(new reflection.Obj(new TestObject()).hasMethod('sayHello')).toBe(true));

		it('returns false for missing function', () => expect(new reflection.Obj(new TestObject()).hasMethod('sayHelloo')).toBe(false));

		it('returns true for prototype function', () => expect(new reflection.Obj(new TestObject()).hasMethod('sayGoodbye')).toBe(true));

		it('returns false for property', () => expect(new reflection.Obj(new TestObject()).hasMethod('hello')).toBe(false));

		it('returns false for prototype property', () => expect(new reflection.Obj(new TestObject()).hasMethod('goodbye')).toBe(false));

		describe('with includePrototype true', () => {

			it('returns true for function', () => expect(new reflection.Obj(new TestObject()).hasMethod('sayHello', true)).toBe(true));

			it('returns false for missing function', () => expect(new reflection.Obj(new TestObject()).hasMethod('sayHelloo', true)).toBe(false));

			it('returns true for prototype function', () => expect(new reflection.Obj(new TestObject()).hasMethod('sayGoodbye', true)).toBe(true));

			it('returns false for property', () => expect(new reflection.Obj(new TestObject()).hasMethod('hello', true)).toBe(false));

			it('returns false for prototype property', () => expect(new reflection.Obj(new TestObject()).hasMethod('goodbye', true)).toBe(false));
		});

		describe('with includePrototype false', () => {

			it('returns true for function', () => expect(new reflection.Obj(new TestObject()).hasMethod('sayHello', false)).toBe(true));

			it('returns false for missing function', () => expect(new reflection.Obj(new TestObject()).hasMethod('sayHelloo', false)).toBe(false));

			it('returns false for prototype function', () => expect(new reflection.Obj(new TestObject()).hasMethod('sayGoodbye', false)).toBe(false));

			it('returns false for property', () => expect(new reflection.Obj(new TestObject()).hasMethod('hello', false)).toBe(false));

			it('returns false for prototype property', () => expect(new reflection.Obj(new TestObject()).hasMethod('goodbye', false)).toBe(false));
		});
	});

	describe('getName', () => {

		it('returns the name', () => expect(new reflection.Obj(new TestObject()).getName()).toBe('TestObject'));
	});

	describe('getConstructor', () => {

		it('returns a function', () => expect(new reflection.Obj(new TestObject()).getConstructor('hello')).toEqual(jasmine.any(Function)));

		it('returns the constructor function', () => expect(new reflection.Obj(new TestObject()).getConstructor('hello')).toEqual(TestObject));
	});

	describe('getConstructorParameters', () => {

		it('returns the constructor parameters', () => expect(new reflection.Obj(new TestObject()).getConstructorParameters()).toEqual(['param']));
	});

	describe('getMethodParameters', () => {

		it('throws when the function doesn\'t exist', () => expect(() => new reflection.Obj(new TestObject()).getMethodParameters('sayHelloo')).toThrow(new reflection.ObjMethodNotExistError()));

		it('returns a functions\' parameters', () => expect(new reflection.Obj(new TestObject()).getMethodParameters('sayHello')).toEqual(['param1a', 'param2a', 'param3a', 'param4a']));

		it('returns a prototype functions\' parameters', () => expect(new reflection.Obj(new TestObject()).getMethodParameters('sayGoodbye')).toEqual(['param1c', 'param2c', 'param3c', 'param4c']));

		it('returns a lambda functions\' parameters', () => expect(new reflection.Obj(new TestObject()).getMethodParameters('sayHi')).toEqual(['param1b', 'param2b', 'param3b', 'param4b']));

		it('returns a prototype lambda functions\' parameters', () => expect(new reflection.Obj(new TestObject()).getMethodParameters('sayCheers')).toEqual(['param1d', 'param2d', 'param3d', 'param4d']));
	});

	describe('getMethods', () => {

		it('returns all functions\' names', () => expect(new reflection.Obj(new TestObject()).getMethods()).toEqual(['sayHello', 'sayHi', 'sayGoodbye', 'sayCheers']));
	});

	describe('getMethod', () => {

		it('throws when the function doesn\'t exist', () => expect(() => new reflection.Obj(new TestObject()).getMethod('sayHelloo')).toThrow(new reflection.ObjMethodNotExistError()));

		it('returns the function', () => expect(new reflection.Obj(new TestObject()).getMethod('sayHello')).toEqual(jasmine.any(Function)));

		it('returns the prototype function', () => expect(new reflection.Obj(new TestObject()).getMethod('sayGoodbye')).toEqual(jasmine.any(Function)));
	});

	describe('getProperties', () => {

		it('returns all properties\' names', () => expect(new reflection.Obj(new TestObject()).getProperties()).toEqual(['hello', 'sub', 'goodbye']));
	});

	describe('getProperty', () => {

		it('throws when the property doesn\'t exist', () => expect(() => new reflection.Obj(new TestObject()).getProperty('helloo')).toThrow(new reflection.ObjPropertyNotExistError()));

		it('returns the property', () => expect(new reflection.Obj(new TestObject()).getProperty('hello')).toEqual(jasmine.any(String)));
	});
});

describe('Func', () => {

	[
		{ obj: null, typeName: 'null', error: new reflection.FuncNotFunctionError()},
		{ obj: undefined, typeName: 'undefined', error: new reflection.FuncNotFunctionError()},
		{ obj: /\s/g, typeName: 'regexp', error: new reflection.FuncNotFunctionError()},
		{ obj: [], typeName: 'array', error: new reflection.FuncNotFunctionError()},
		{ obj: 'hello', typeName: 'string', error: new reflection.FuncNotFunctionError()},
		{ obj: true, typeName: 'boolean', error: new reflection.FuncNotFunctionError()},
		{ obj: {}, typeName: 'object', error: new reflection.FuncNotFunctionError()},
		{ obj: new Date(), typeName: 'date', error: new reflection.FuncNotFunctionError()},
		{ obj: new Error(), typeName: 'error', error: new reflection.FuncNotFunctionError()},
		{ obj: 1, typeName: 'number', error: new reflection.FuncNotFunctionError()}
	].forEach((test) => {

		it('throws with an invalid object of type ' + test.typeName, () => expect(() => new reflection.Func(test.obj)).toThrow(test.error));
	});

	describe('with a named function', () => {

		function testFunction(/* A comment */ param1, /* Another comment */ param2 /* A post comment */,
			// a line comment
			param3,
			param4) {

			return 42;
		}
		testFunction();

		describe('getName', () => {

			it('returns the name', () => expect(new reflection.Func(testFunction).getName()).toBe('testFunction'));
		});

		describe('getParameters', () => {

			it('returns the parameters', () => expect(new reflection.Func(testFunction).getParameters()).toEqual(['param1', 'param2', 'param3', 'param4']));
		});
	});

	describe('with a parameterless named function', () => {

		function testFunction() {

			return 42;
		}
		testFunction();

		describe('getName', () => {

			it('returns the name', () => expect(new reflection.Func(testFunction).getName()).toBe('testFunction'));
		});

		describe('getParameters', () => {

			it('returns the parameters', () => expect(new reflection.Func(testFunction).getParameters()).toEqual([]));
		});
	});

	describe('with an anonymous function', () => {

		((testFunction) => {

			testFunction();

			describe('getName', () => {

				it('returns the name', () => expect(new reflection.Func(testFunction).getName()).toBe(''));
			});

			describe('getParameters', () => {

				it('returns the parameters', () => expect(new reflection.Func(testFunction).getParameters()).toEqual(['param1', 'param2', 'param3', 'param4']));
			});

		})(function (/* A comment */ param1, /* Another comment */ param2 /* A post comment */,
			// a line comment
			param3,
			param4) {

			return 42;
		});
	});

	describe('with an object function', () => {

		const testObject = {
			testFunction: function (/* A comment */ param1, /* Another comment */ param2 /* A post comment */,
				// a line comment
				param3,
				param4) {

				return 42;
			}
		};
		testObject.testFunction();

		describe('getName', () => {

			it('returns the name', () => expect(new reflection.Func(testObject.testFunction).getName()).toBe('testFunction'));
		});

		describe('getParameters', () => {

			it('returns the parameters', () => expect(new reflection.Func(testObject.testFunction).getParameters()).toEqual(['param1', 'param2', 'param3', 'param4']));
		});
	});

	describe('with a lambda function', () => {

		const testFunction = (/* A comment */ param1, /* Another comment */ param2 /* A post comment */,
			// a line comment
			param3,
			param4) => {

			return 42;
		};
		testFunction();

		describe('getName', () => {

			it('returns the name', () => expect(new reflection.Func(testFunction).getName()).toBe('testFunction'));
		});

		describe('getParameters', () => {

			it('returns the parameters', () => expect(new reflection.Func(testFunction).getParameters()).toEqual(['param1', 'param2', 'param3', 'param4']));
		});
	});

	describe('with a parameterless lambda function', () => {

		const testFunction = () => {

			return 42;
		};
		testFunction();

		describe('getName', () => {

			it('returns the name', () => expect(new reflection.Func(testFunction).getName()).toBe('testFunction'));
		});

		describe('getParameters', () => {

			it('returns the parameters', () => expect(new reflection.Func(testFunction).getParameters()).toEqual([]));
		});
	});

	describe('with a single param lambda function', () => {

		const testFunction = param1 => { // eslint-disable-line arrow-parens

			return 42;
		};
		testFunction();

		describe('getName', () => {

			it('returns the name', () => expect(new reflection.Func(testFunction).getName()).toBe('testFunction'));
		});

		describe('getParameters', () => {

			it('returns the parameters', () => expect(new reflection.Func(testFunction).getParameters()).toEqual(['param1']));
		});
	});
});

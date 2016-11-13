const MetaObject = require('../src/index.js');

describe('MetaObject', function () {

	function TestObject(param) {

		this.hello = 'Hello World !';

		this.sub = {
			sayHello: function () {
				return 'Hi People !';
			}
		};
	}

	TestObject.prototype.test = 'test';

	TestObject.prototype.sayHello = function (/* A comment */ param1, /* Another comment */ param2 /* A post comment */,
		// a line comment
		param3,
		param4) {

		return this.hello;
	};

	describe('hasProperty', function () {

		it('to work', function () {

			const testObject = new TestObject();
			const metaObject = new MetaObject(testObject);

			expect(metaObject.hasProperty('hello')).toBe(true);
		});
	});

	describe('hasMethod', function () {

		it('to work', function () {

			const testObject = new TestObject();
			const metaObject = new MetaObject(testObject);

			expect(metaObject.hasMethod('sayHello')).toBe(true);
		});
	});

	describe('getName', function () {

		it('to work', function () {

			const testObject = new TestObject();
			const metaObject = new MetaObject(testObject);

			expect(metaObject.getName()).toBe('TestObject');
		});
	});

	describe('getConstructor', function () {

		it('to work', function () {

			const testObject = new TestObject();
			const metaObject = new MetaObject(testObject);

			expect(metaObject.getConstructor('hello')).toEqual(jasmine.any(Function));
		});
	});

	describe('getConstructorParameters', function () {

		it('to work', function () {

			const testObject = new TestObject();
			const metaObject = new MetaObject(testObject);

			expect(metaObject.getConstructorParameters()).toEqual(['param']);
		});
	});

	describe('getMethodParameters', function () {

		it('to work', function () {

			const testObject = new TestObject();
			const metaObject = new MetaObject(testObject);

			expect(metaObject.getMethodParameters('sayHello')).toEqual(['param1', 'param2', 'param3', 'param4']);
		});
	});

	describe('getMethods', function () {

		it('to work', function () {

			const testObject = new TestObject();
			const metaObject = new MetaObject(testObject);

			expect(metaObject.getMethods()).toEqual(['sayHello']);
		});
	});

	describe('getMethod', function () {

		it('to work', function () {

			const testObject = new TestObject();
			const metaObject = new MetaObject(testObject);

			expect(metaObject.getMethod('sayHello')).toEqual(jasmine.any(Function));
		});
	});

	describe('getProperties', function () {

		it('to work', function () {

			const testObject = new TestObject();
			const metaObject = new MetaObject(testObject);

			expect(metaObject.getProperties()).toEqual(['hello', 'sub', 'test']);
		});
	});

	describe('getProperty', function () {

		it('to work', function () {

			const testObject = new TestObject();
			const metaObject = new MetaObject(testObject);

			expect(metaObject.getProperty('hello')).toEqual(jasmine.any(String));
		});
	});
});

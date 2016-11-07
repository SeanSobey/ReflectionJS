const MetaObject = require('../src/index.js');





    function MyObject(param) {

        this.hello = 'Hello World !';

        this.sub = {
            sayHello: function () {
                return 'Hi People !';
            }
        };
    }

    MyObject.prototype.test = 'test';

    MyObject.prototype.sayHello = function ( /* A comment */ param1, /* Another comment */ param2 /* A post comment */ ,
        // a line comment
        param3,
        param4) {

        return this.hello;
    };

    const myObject = new MyObject();

     console.log('hasProperty', new MetaObject(myObject).hasProperty('hello'));
    console.log('hasMethod', new MetaObject(myObject).hasMethod('sayHello'));
    console.log('getName', new MetaObject(myObject).getName());
    console.log('getConstructor', new MetaObject(myObject).getConstructor());
    console.log('getConstructorParameters', new MetaObject(myObject).getConstructorParameters());
    console.log('getMethod', new MetaObject(myObject).getMethod('sayHello'));
    console.log('getMethods', new MetaObject(myObject).getMethods());
    console.log('getMethodParameters', new MetaObject(myObject).getMethodParameters('sayHello'));
    console.log('getProperty', new MetaObject(myObject).getProperty('hello'));
    console.log('getProperties', new MetaObject(myObject).getProperties());

    function test(param1) {

    }

    function test2() {

        console.log(test2.caller.toString());
    }
    test2();

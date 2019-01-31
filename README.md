# How to use Jest for React Unit Testing

> Translated from https://juejin.im/post/5b6c39bde51d45195c079d62

## React Unit Testing Program

- ### Pre-Knowledge

  - #### Why for testing

    - Testing can ensure the desired results
    - As a description of existing code behavior
    - Make developers to write testable codes, generally testable code readability will be higher
    - If the dependent component has a modification, the affected component can find the error in the test.

  - #### Testing Type

    - **Unit Test:** Refers to testing the software in units of original units. A unit can be a function, or it can be a module or a component. The basic feature is that the same output must be returned as long as the input is unchanged. The easier it is for a piece of software to test a unit, the better its modular structure and the weaker the coupling between the modules. React's componentization and functional programming are inherently suitable for unit testing.
    - **Functional test:** Equivalent to black box testing, the tester does not understand the internal situation of the program, does not need to have the expertise of the programming language, only knows the input, output and function of the program, from the user's point of view for the software interface, function and external structure Testing, regardless of internal logic.
    - **Integration test:** Based on the unit test, all modules are assembled into subsystems or systems according to design requirements for testing.
      Smoke test: Before the formal and comprehensive test, the main function is tested and tested to confirm whether the main function meets the needs and whether the software can run normally.

  - #### Development Model

    - **TDD:** Stand for _Test-Driven Development_, which emphasizes a development method. It drives the project by testing, that is to complete the test preparation according to the interface, and then to complete the function to continue to pass the test, the ultimate goal is to pass all test.
    - **BDD:** Stand for _Behavior-Driven Development_, which emphasizies the style of writing tests, that is the test should be written like natural language, so that all members of the project can even understand the test, or even write the test.

    TDD and BDD have their own usage scenarios. BDD generally prefers automated test design for system functions and business logic. TDD is more efficient in rapidly developing and testing functional modules for rapid development.

* ### Technical Selection: Jest + Enzyme

  - #### Jest

    Jest is a front-end testing framework which opened by Facebook. Mainly for unit testing of React and React Native, which has been integrated into _create-react-app_. Jest features:

    1. **Ease of use:** Based on Jasmine, provides an assertion library that supports multiple test styles
    2. **Adaptability:** Jest is modular, scalable and configurable
       Sandbox and Snapshot: Jest has built-in JS DOM that emulates the browser environment and executes in parallel.
    3. **Snapshot test:** Jest can serialize the React component tree, generate corresponding string snapshots, and provide high-performance UI detection by comparing strings.
    4. **Mock system:** Jest implements a powerful Mock system that supports automatic and manual mocks.
    5. **Support for asynchronous code testing:** support for Promise and async/await.
    6. **Automatically generate static analysis results:** built-in Istanbul, testing code coverage scale, and generate corresponding reports

  - #### Enzyme

    Enzyme is a React test tool library which opened by Airbnb. It has been encasulated in the secondary package of the official test tool library ReactTestUtils, providing a simple and powerful API, and with built-in Cheerio.

    The jQuery-style approach to DOM processing is implemented, and the development experience is very friendly. It has a high popularity in the open source community and has also received official React recommendations.

* ### Build the Testing Environment

  Install Jest, Enzyme and babel-jest. Please install and configure the _enzyme-adapter-react-15_ or _enzyme-adapter-react-16_ when your version of React is 15 or 16.

  ```javascript
  import Enzyme from "enzyme";
  import Adapter from "enzyme-adapter-react-16";

  Enzyme.configure({ adapter: new Adapter() });
  ```

  Insert `test:jest --config .jest.js` into the script of the package.json

  ```javascript
  //.jest.js

  module.exports = {
    setupFiles: ["./test/setup.js"],
    moduleFileExtensions: ["js", "jsx"],
    testPathIgnorePatterns: ["/node_modules/"],
    testRegex: ".*\\.test\\.js$",
    collectCoverage: false,
    collectCoverageFrom: ["src/components/**/*.{js}"],
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js"
    },
    transform: {
      "^.+\\.js$": "babel-jest"
    }
  };
  ```

  - **setupFiles:** The configuration file path. Jest will run the configuration file to initialize the testing environment before running the testing case codes.
  - **moduleFileExtensions:** To configure the file name which the Jest will load.
  - **testPathIgnorePatterns:** Use Regex to match files that are not need to tested.
  - **testRegex:** Use Regex to match files that are need to tested. The pattern is xxx.test.js.
  - **collectCoverage: ** Generate testing coverage reports or not. If true, it will cost more time for testing.
  - **collectCoverageFrom:** The files which saved the testing coverage reports.
  - **moduleNameMapper: ** Stand for the source name which will be mocked.
  - **transform:** Use _babel-jest_ to build js files, and generate ES6/7 syntax.

* ### Jest

  - #### globals API

    - describe(name, fn): A block includes some relative testing cases.
    - it(name, fn, timeout): Set some testing cases, which aliased _test_.
    - afterAll(fn, timeout): The function which will be executed after all test cases.
    - beforeAll(fn, timeout): The function which will be executed before all test cases.
    - afterEach(fn): The function which will be runned after each test case.
    - beforeEach(fn): The function which will be executed before each test case.

    Both the global and the description can have the above four periodic functions. The after functions in describe priority is higher than the after functions of global, the before functions of describe priority is lower than the before functions of global.

    ```javascript
    beforeAll(() => {
      console.log("global before all");
    });

    afterAll(() => {
      console.log("global after all");
    });

    beforeEach(() => {
      console.log("global before each");
    });

    afterEach(() => {
      console.log("global after each");
    });

    describe("test1", () => {
      beforeAll(() => {
        console.log("test1 before all");
      });

      afterAll(() => {
        console.log("test1 after all");
      });

      beforeEach(() => {
        console.log("test1 before each");
      });

      afterEach(() => {
        console.log("test1 after each");
      });

      it("test sum", () => {
        expect(sum(2, 3)).toEqual(5);
      });

      it("test mutil", () => {
        expect(sum(2, 3)).toEqual(7);
      });
    });
    ```

  - #### config

    Jest has a lot of configuration items, you can write in the _package.json_ to increase the jest field to configure, or specify the configuration file through the command line `--config`.

  - #### Jest Object

    - jest.fn(implementation): Returns a new mock function which has not been used. The function will record lots of information about the function call when it is called.
    - jest.mock(moduleName, factory, options): Used to mock some modules and documents.
    - est.spyOn(object, methodName): Returns a mock function which likes _jest.fn_. But it is similar to Sinon that can track the call information of _object[methodName]_.

  - #### Mock Functions

    Using the mock function makes it easy to simulate the dependencies between code. You can mock a specific function with fn or spyOn; simulate a module with a mock.

  - #### Snapshots

    The snapshot will generate the UI structure of a component, and store it in the \_\_snapshots\_\_ file as a string. By comparing the two strings to determine whether the UI changes, because it is a string comparison, the performance is very high.

    To use the snapshot function, you need to import the react-test-renderer library and use the renderer method. If the toMatchSnapshot method is found during the execution of jest, a \_\_snapshots\_\_ folder will be generated in the same directory to store the snapshot file. The second test will be compared with the first generated snapshot. You can use `jest --updateSnapshot` to update the snapshot file.

  - #### Async Testing

    Jest supports async testing includes both Promise and Async/Await modes.

  - #### Common assertions

    - expect(value): Use it to wrap the value when you want to test a value for assertion.
    - toBe(value): Use _Object.is_ to compare it. If you want to compare float numbers, you need to use _toBeCloseTo_
    - not: Used to reverse.
    - toEqual(value): For deep comparison of objects.
    - toMatch(regexpOrString): Use Regex or String to check if the string matches.
    - toContain(item): Used to determine whether the item is in an array, it can also be used for string judgment.
    - toBeNull(value): Just matches Null.
    - toBeUndefined(value): Just matches Undefined.
    - toBeDefined(value): Contrary to _toBeUndefined_
    - toBeTruthy(value): Matches any value that makes the if statement true.
    - toBeFalsy(value): Matches any value that makes the if statement false.
    - toBeGreaterThan(number): Greater than
    - toBeGreaterThanOrEqual(number): Greater than or equal
    - toBeLessThan(number): Less than
    - toBeLessThanOrEqual(number): Less than or equal
    - toBeInstanceOf(class): Used to determine whether it is an instance of class.
    - anything(value): Used to matches all value without Null or Undefined.
    - resolves: Used to get the value of promise when the promise is _fulfilled_, and it supports chained calls.
    - rejects: Used to get the value of promise when the promise is _rejected_, and it supports chained calls.
    - toHaveBeenCalled(): Used to determine the mock function was called or not.
    - toHaveBeenCalledTimes(number): Used to determine the times of the mock function was called.
    - assertions(number): Verify the number of assertions are called in a test case.
    - extend(matchers): Customize some assertions.

* ### Enzyme

  - #### Three rendering methods

    - **shallow:** Shallow Rendering, which enpcasulates the official Shallow Renderer. Rendering a component as a virtual DOM object, it will just render the first layer, and the child components will not be rendered, so it is very efficient. It can use jQuery to access the components information without DOM environment.
    - **render:** Static rendering, which renders the React component into a static HTML string, then parses the string using the Cheerio library and returns a Cheerio instance object that can be used to analyze the component's html structure.
    - **mount**: Full rendering, it renders component into a real DOM node that tests the interaction of the DOM API, and the lifecycle of the component. Use jsdom to simulate the browser environment.

    Among the three methods, _shallow_ and _mount_ are returned as DOM objects, you can use _simulate_ to simulate interactively, and the _render_ method is not. In general, the _shallow_ method can meet the requirements. If you need to determine the child components, you need to use _render_. If you need to test the life cycle of the components, you need to use the _mount_ method.

  - #### Common methods

    - simulate(event, mock): Simulate events, used to trigger an event. The event argument is the name of event, and the mock is an event object.
    - instance(): Returns an instance of components.
    - find(selector): Find the node according to the selectors, and the selector can be CSS selector, or the constructor of component, or the display name of component.
    - at(index): Returns a rendered object.
    - get(index): Returns a React node. You need to render again if you want to test it.
    - contains(nodeOrNodes): Used to determine whether the current object includes the node. The argument type is React object or object array.
    - text(): Returns the text of current component
    - html(): Returns HTML of current component
    - props(): Returns all properties of the root component
    - prop(key): Returns the specified property of the root component.
    - state(): Returns states of the root components
    - setState(nextState): Used to set states of the root component
    - setProps(nextProps): Used to set properties of the root component

* ### Write a test case

  - #### component codes

    ```react
    //todo-list/index.js

    import React, { Component } from 'react';
    import { Button } from 'antd';

    export default class TodoList extends Component {
      constructor(props) {
        super(props);
        this.handleTest2 = this.handleTest2.bind(this);
      }
      handleTest = () => {
        console.log('test');
      }

      handleTest2() {
        console.log('test2');
      }

      componentDidMount() {}

      render() {
        return (
          <div className="todo-list">
            {this.props.list.map((todo, index) => (<div key={index}>
              <span className="item-text ">{todo}</span>
              <Button onClick={() => this.props.deleteTodo(index)} >done</Button>
            </div>))}
          </div>
        );
      }
    }
    ```

  - #### Options of the testing file setup

    ```javascript
    const props = {
      list: ["first", "second"],
      deleteTodo: jest.fn()
    };

    const setup = () => {
      const wrapper = shallow(<TodoList {...props} />);
      return {
        props,
        wrapper
      };
    };

    const setupByRender = () => {
      const wrapper = render(<TodoList {...props} />);
      return {
        props,
        wrapper
      };
    };

    const setupByMount = () => {
      const wrapper = mount(<TodoList {...props} />);
      return {
        props,
        wrapper
      };
    };
    ```

  - #### Use Snapshot to test UI

    ```react
    it('renders correctly', () => {
      const tree = renderer
      .create(<TodoList {...props} />)
              .toJSON();

      expect(tree).toMatchSnapshot();
    });
    ```

    When using _toMatchSnapshot_, a snapshot of the component DOM is generated. Each time the test case is runned, a component snapshot is generated and compared with the first generated snapshot. If the structure of the component is modified, the current generated snapshot will be failed. You can re-test the UI by updating the snapshot.

  - #### Test for component nodes

    ```react
    it('should has Button', () => {
      const { wrapper } = setup();
      expect(wrapper.find('Button').length).toBe(2);
    });

    it('should render 2 item', () => {
      const { wrapper } = setupByRender();
      expect(wrapper.find('button').length).toBe(2);
    });

    it('should render item equal', () => {
      const { wrapper } = setupByMount();
      wrapper.find('.item-text').forEach((node, index) => {
        expect(node.text()).toBe(wrapper.props().list[index])
      });
    });

    it('click item to be done', () => {
      const { wrapper } = setupByMount();
      wrapper.find('Button').at(0).simulate('click');
      expect(props.deleteTodo).toBeCalled();
    });
    ```

    Determine whether the component has a Button component. Because there is no need to render child nodes, use the _shallow_ method to render the component. Since the list of props has two items, it is expected that there should be two Button components.

    Determine whether the component has the button element, because the button is the element in the Button component, all using the _render_ method to render, it is expected to find a button element.
    Determine the contents of the component, use the _mount_ method to render, and then use _forEach_ to determine whether the content of _.item-text_ is equal to the value passed in. Use _simulate_ to trigger the click event, because deleteTodo is mocked, so you can use the deleteTodo method to be called to determine if the click event is triggered.

  - #### Test for the component lifecycle

    ```react
    //When you use spy, you should restore it after testing. If not the spy will still exist, and can not use the same function to spy.
    it('calls componentDidMount', () => {
      const componentDidMountSpy = jest.spyOn(TodoList.prototype, 'componentDidMount');
      const { wrapper } = setup();
      expect(componentDidMountSpy).toHaveBeenCalled();
      componentDidMountSpy.mockRestore();
    });
    ```

    Using spyOn to componentDidMount of the mock component, the substitude function should be defined before the component is executed before the component is rendered, and the avatar function should be restored after the judgment, otherwise the substitude function will always exist and the function is mocked. Can't be mocked again.

  - #### Test for the inner functions of components

    ```react
    it('calls component handleTest', () => { // Use the arrow function to define a method in class
      const { wrapper } = setup();
      const spyFunction = jest.spyOn(wrapper.instance(), 'handleTest');
      wrapper.instance().handleTest();
      expect(spyFunction).toHaveBeenCalled();
      spyFunction.mockRestore();
    });

    it('calls component handleTest2', () => { //Use bind to define methods in constructor
      const spyFunction = jest.spyOn(TodoList.prototype, 'handleTest2');
      const { wrapper } = setup();
      wrapper.instance().handleTest2();
      expect(spyFunction).toHaveBeenCalled();
      spyFunction.mockRestore();
    });

    ```

    Use the instance function to get an instance of the component, and use the spyOn method to mock the internal method on the instance, and then use this instance to call the internal method, you can use the alias to determine whether the internal function is called. If the internal method is defined by the arrow function, you need to mock the instance; if the internal method is defined by the normal way or bind, you need to mock the component's prototype. In fact, the test of the life cycle or internal functions can be judged by some state changes, because the calls of these functions generally perform some operations on the state of the component.

  - #### Manual Mocks

    - To manually simulate the global module (moduleName), you need to create a new \_\_mocks\_\_ folder in the node_modules level and create a new moduleName file in the folder.
    - To manually simulate a file (fileName), you need to create a new \_\_mocks\_\_ folder in the level of the simulated file level, and then create a new file named fileName in the folder.

    ```javascript
    // add/index.js

    import { add } from "lodash";
    import { multip } from "../../utils/index";

    export default function sum(a, b) {
      return add(a, b);
    }

    export function m(a, b) {
      return multip(a, b);
    }
    ```

    ```javascript
    // add/__test__/index.test.js

    import sum, { m } from "../index";

    jest.mock("lodash");
    jest.mock("../../../utils/index");

    describe("test mocks", () => {
      it("test sum", () => {
        expect(sum(2, 3)).toEqual(5);
      });
      it("test mutilp", () => {
        expect(m(2, 3)).toEqual(7);
      });
    });
    ```

    In the test file, use the mock() method to reference the file to be mocked. Jest will automatically find the file in the corresponding \_\_mocks\_\_ and replace it. The add and utils multip methods in lodash will be mocked. Into the corresponding method. You can use the automatic proxy method to mock the project's asynchronous component library (fetch, axios), or use fetch-mock, jest-fetch-mock to simulate asynchronous requests.

  - #### Test async methods

    ```javascript
    // async/index.js

    import request from "./request";

    export function getUserName(userID) {
      return request(`/users/${userID}`).then(user => user.name);
    }

    async / request.js;

    const http = require("http");
    export default function request(url) {
      return new Promise(resolve => {
        // This is an example of an http request, for example to fetch
        // user data from an API.
        // This module is being mocked in __mocks__/request.js
        http.get({ path: url }, response => {
          let data = "";
          response.on("data", _data => (data += _data));
          response.on("end", () => resolve(data));
        });
      });
    }
    ```

    mock request:

    ```javascript
    const users = {
      4: {
        name: "caocao"
      },
      5: {
        name: "geely"
      }
    };

    export default function request(url) {
      return new Promise((resolve, reject) => {
        const userID = parseInt(url.substr("/users/".length), 10);
        process.nextTick(() => {
          users[userID]
            ? resolve(users[userID])
            : reject({
                error: `User with ${userID} not found.`
              });
        });
      });
    }
    ```

    Request.js can be thought of as a module for requesting data. Manually mock this module to return a Promise object for asynchronous processing.

  - #### Test Promise

    ```javascript
    // use '.resolves' to test the returns when promise is successed
    it("works with resolves", () => {
      // expect.assertions(1);
      expect(user.getUserName(5)).resolves.toEqual("geely");
    });

    // use '.rejects'to test the returns when promise is failed
    it("works with rejects", () => {
      expect.assertions(1);
      return expect(user.getUserName(3)).rejects.toEqual({
        error: "User with 3 not found."
      });
    });

    // use the returns of the promise to test
    it("test resolve with promise", () => {
      expect.assertions(1);
      return user.getUserName(4).then(data => {
        expect(data).toEqual("caocao");
      });
    });
    it("test error with promise", () => {
      expect.assertions(1);
      return user.getUserName(2).catch(e => {
        expect(e).toEqual({
          error: "User with 2 not found."
        });
      });
    });
    ```

    When testing a Promise, be sure to add a return before the assertion, otherwise the test function will end without waiting for the Promise to return. You can use .promises/.rejects to get the returned value, or use the then/catch method to determine.

  - #### Test async/await

    ```javascript
    // use async/await to test resolve
    it("works resolve with async/await", async () => {
      expect.assertions(1);
      const data = await user.getUserName(4);
      expect(data).toEqual("caocao");
    });

    // use async/await to test reject
    it("works reject with async/await", async () => {
      expect.assertions(1);
      try {
        await user.getUserName(1);
      } catch (e) {
        expect(e).toEqual({
          error: "User with 1 not found."
        });
      }
    });
    ```

    Use async without return, and use try/catch to catch exceptions

* ### Code Coverage

  Code coverage is a test metric that describes whether the code for a test case is executed. Statistical code coverage generally relies on code coverage tools, and Jest integrates the code coverage tool from Istanbul.

  - #### Four measurement dimensions

    - line coverage: Whether each line of the test case is executed
    - function coverage: Whether every function of the test case is called
    - branch coverage: Whether each if code block of the test case is executed
    - statement coverage: Whether each statement of the test case is executed

    In four dimensions, if the code is written fairly well, the line coverage and statement coverage should be the same. There are many situations that trigger branch coverage, mainly the following:

    - ||，&&，？，！
    - if statement
    - switch statement

  - #### Example

    ```javascript
    function test(a, b) {
      a = a || 0;
      b = b || 0;
      if (a && b) {
        return a + b;
      } else {
        return 0;
      }
    }

    test(1, 2);
    // test();
    ```

    When executed test(1, 2), the code coverage is:

    - Lines: 85.71% (6/7)
    - Statements: 85.71% (6/7)
    - Branches: 62.5% (5/8)
    - Functions: 100% (1/1)

    When executed test(), the code coverage is:

    - Lines: 85.71% (6/7)
    - Statements: 85.71% (6/7)
    - Branches: 75% (6/8)
    - Functions: 100% (1/1)

  - #### Set threshold

    Stanbul can set the threshold of each coverage on the command line, and then check whether the test case is up to standard. Each dimension is related to the relationship. As long as there is a non-compliance, an error will be reported.

    In Jest, the coverage threshold for different test dimensions can be set by the coverageThreshold configuration item. Global is a global configuration. By default, all test cases must satisfy this configuration to pass the test. Wildcard mode or path configuration is also supported. If these configurations exist, the coverage of the matched files will be removed from the global coverage calculation, and the respective set thresholds will be used independently.

    ```json
    {
      ...
      "jest": {
        "coverageThreshold": {
          "global": {
            "branches": 50,
            "functions": 50,
            "lines": 50,
            "statements": 50
          },
          "./src/components/": {
            "branches": 40,
            "statements": 40
          },
          "./src/reducers/**/*.js": {
            "statements": 90,
          },
          "./src/api/very-important-module.js": {
            "branches": 100,
            "functions": 100,
            "lines": 100,
            "statements": 100
          }
        }
      }
    }

    ```

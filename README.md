# react-mock-router

React Mock Router is a simple-to-use tool for testing React components that
use React Router v4. It can be used in tests as a replacement for React
Router's `MemoryRouter` and `StaticRouter`.

## Installation

`npm install react-mock-router --save-dev`

## API

The `MockRouter` component can recieve any of the following arguments as props.

* `location`
* `params`
* `path`
* `createHref`
* `push`
* `replace`

## Use

React Mock Router takes mocked router props as arguments, passing them to
children components.

```jsx
import MockRouter from 'react-mock-router';

it('has a button that links to the todo edit page', () => {

  const testProps = {
    todo: {
      id: 1,
      title: "Title",
      body: "Body"
    }
  };
  
  const push = jest.fn();

  const todoItemWrapper = mount(
    <MockRouter push={push}>
      <Route render={(props) => (
        <TodoItem {...props} {...testProps}/>
      )}/>
    </MockRouter>
  ).find('TodoItem');

  const editButton = todoItemWrapper.find('button').filterWhere(button =>
    /edit/i.test(button.props().children)
  );

  editButton.simulate('click', { preventDefault() { } });
  expect(push).toBeCalledWith(`/todo/${todo.id}/edit`);

});
```

React Mock Router also provides the correct `context` for components
being tested, so you won't recieve errors if those components use React Router
components like `Route` or `Link`. If you're testing a component that isn't 
considered a route component (i.e. not rendered as part of a `Route`) but need
to wrap it in a router, you can do the following.

```jsx
import MockRouter from 'react-mock-router';

it('correctly defines the action when given a formType', () => {
  
  const todoFormWrapper = mount(
    <MockRouter>
        <TodoFormContainer formType="new" />
    </MockRouter>
  ).find('TodoForm');

  expect(todoFormWrapper.props().action).toBeDefined();
});
```

### License

This project is released under the [MIT license](./LICENSE.md).


import React, {Component} from 'react';
import {withRouter} from 'react-router'
import PropTypes from 'prop-types';
import {mount} from 'enzyme';
import MockRouter from '../index';

console.error = jest.fn();

const createHrefStub = () => {};
const pushStub = () => {};
const replaceStub = () => {};

afterEach(() => console.error.mockReset());

class MockComponent extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return <div>{this.props.message}</div>
	}
}

MockComponent.propTypes = {
	match: PropTypes.object.isRequired,
	location: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	history: PropTypes.object.isRequired
}

const WrappedMockComponent = withRouter(MockComponent)

const getComponentWithoutNesting = () => {
	return mount(<MockComponent message='Hello world' />)
};

const getComponentWithRouter = props => {
	return mount(
		<MockRouter {...props}>
			<WrappedMockComponent message='Hello world' />
		</MockRouter>);
}

test('it should throw a propType validation error', () => {
	getComponentWithoutNesting();
	expect(console.error).toHaveBeenCalled();
});

test('it should not throw a propType validation error', () => {
	getComponentWithRouter();
	expect(console.error).not.toHaveBeenCalled();
});

test('it should pass router props to component', () => {
	const component = getComponentWithRouter({
		action: 'POP',
		url: '/foobar',
		location: '/bin/baz',
		params: {foo: 'bar'},
		path: '/wat',
		createHref: createHrefStub,
		push: pushStub,
		replace: replaceStub
	});
	expect(component.find(MockComponent).props()).toEqual({
		"history": {
			action: 'POP',
			"createHref": createHrefStub,
			"path": "/wat",
			"push": pushStub,
			"replace": replaceStub
		},
		"location": "/bin/baz",
		"match": {
			"params": {
				"foo": "bar"
			},
			"path": "/wat",
			"url": "/foobar"
		},
		"message": "Hello world",
		"staticContext": undefined
	});
});
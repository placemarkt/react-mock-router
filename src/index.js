
import React from 'react';
import PropTypes from 'prop-types';

const noop = () => {};

export default class MockRouter extends React.Component {

  getChildContext() {
    return ({
      router: {
        route: {
          location: this.props.location,
          match: {
            url: this.props.url,
            params: this.props.params,
            path: this.props.path
          }
        },
        history: {
          path: this.props.path,
          createHref: this.props.createHref,
          push: this.props.push,
          replace: this.props.replace
        }
      }
    });
  }

  render() {
    return (
      React.Children.only(this.props.children)
    );
  }
}

MockRouter.childContextTypes = {
  router: PropTypes.object
};

MockRouter.defaultProps = {
  url: '',
  location: {},
  params: {},
  path: '',
  createHref: noop,
  push: noop,
  replace: noop
}

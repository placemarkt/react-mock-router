import React from 'react';
import PropTypes from 'prop-types';

export default class MockRouter extends React.Component {

  getChildContext() {
    return (
      {
        router: {
          route: {
            location: this.props.location || "",
            match: {
              params: this.props.params || {},
              path: this.props.path || ""
            }
          },
          history: {
            path: this.props.path || "",
            createHref: function() {},
            push: this.props.push || function() {},
            replace: this.props.replace || function() {}
          }
        }
      }
    );
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

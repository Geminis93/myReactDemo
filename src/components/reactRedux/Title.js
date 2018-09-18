import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Title extends Component {
  static contextTypes = {
    themeColor: PropTypes.string,
    text: PropTypes.string,
  }

  render () {
    console.log('content', this.context);
    const { themeColor, text } = this.context;
    return (
      <h1 style={{ color: themeColor }}>React.js { text }</h1>
    )
  }
}

export default Title;

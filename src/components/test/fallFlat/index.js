import React, { Component } from 'react';
import './index.scss';

class FallFlat extends Component {
  state = {
    style: '0 0',
  }

  onMouseEnter(e) {
    this.setState({
      style: `${e.clientX - this.mouseDiv.offsetLeft - 25}px ${e.clientY - this.mouseDiv.offsetTop - 25}px`,
    })
  }

  onMouseMove(e) {
    this.setState({
      style: `${e.clientX - this.mouseDiv.offsetLeft - 25}px ${e.clientY - this.mouseDiv.offsetTop - 25}px`,
    })
  }

  render() {
    const { style } = this.state;
    return (
      <div className="fall-box">
        <h3>Fall Flat</h3>
        <div className="fall" ref={refs => this.mouseDiv = refs}>
          <div
            className="fall-map"
            style={{ WebkitMaskPosition: style }}
            onMouseEnter={e => this.onMouseEnter(e)}
            onMouseMove={e => this.onMouseMove(e)}></div>
        </div>
      </div>
    );
  }
};

export default FallFlat;
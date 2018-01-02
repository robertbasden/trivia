import React, { Component } from 'react';

export default class GameOver extends Component {
  render() {
    return (
      <div>
        Score: {this.props.score}
      </div>
    );
  }
}

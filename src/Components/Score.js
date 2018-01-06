import React, { Component } from 'react';

export default class Score extends Component {
  render() {
  	
  	let currentScore = this.props.currentScore
  		, highScore = this.props.highScore
  		, string = '';

  	if (highScore == null) {
        
        string = `Current score: ${currentScore}`;

    } else if(highScore >= currentScore) {
        
    	string = `Current score: ${currentScore} (Previous high score: ${highScore})`;

    } else {
        
        string = `Current score: ${currentScore} (New high score!)`;

    }

    return (
     	<span>{string}</span>
    );
  }
}

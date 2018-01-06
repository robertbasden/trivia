import React, { Component } from 'react';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { Game, reducer as gameReducer, startGame, setHighScore, correctAnswerClicked, incorrectAnswerClicked } from './Game';

const reducers = combineReducers({ game: gameReducer })
let store = createStore(reducers, applyMiddleware(logger, thunk));

var highScore = localStorage.getItem("highScore");
if(highScore != undefined) {
  store.dispatch(setHighScore(highScore));
}
store.dispatch(startGame());

const mapDispatchToProps = (dispatch) => {
    return({
        startGame: () => { store.dispatch(startGame()) },
        correctAnswerClicked: () => { store.dispatch(correctAnswerClicked()); },
        incorrectAnswerClicked: () => { store.dispatch(incorrectAnswerClicked()); }
    })
}

const mapStateToProps = (state) => {
    return state.game;
}

const ConnectedGame = connect(
    state => mapStateToProps,
    dispatch => mapDispatchToProps
)(Game);

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
            <ConnectedGame store={store} />
        </Provider>
      </div>
    );
  }
}

export default App;

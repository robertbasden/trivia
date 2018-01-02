import React, { Component } from 'react';
import { getQuestion } from './questionService';
import Loader from './Components/Loader';
import Question from './Components/Question';
import GameOver from './Components/GameOver';

const defaultState = {
    currentScore: 0,
    currentQuestion: null,
    gameOver: false
}

const actions = {
    NEW_GAME_STARTED: 'NEW_GAME_STARTED',
    LOADING_STARTED: 'LOADING_STARTED',
    QUESTION_LOADED: 'QUESTION_LOADED',
    INC_SCORE: 'INC_SCORE',
    GAME_OVER: 'GAME_OVER'
};

const startGame = () => {
    return (dispatch) => {
        dispatch(newGameStarted());
        dispatch(loadingStarted());
        getQuestion().then(question => {
            dispatch(questionLoaded(question));
        });

    };
};

const correctAnswerClicked = () => {
    return (dispatch) => {
        dispatch(incScore());
        dispatch(loadingStarted());
        getQuestion().then(question => {
            dispatch(questionLoaded(question));
        });
    };
}

const incorrectAnswerClicked = () => {
    return (dispatch) => {
        dispatch(gameOver());
    };
}

const newGameStarted = () => {
    return {
        type: actions.NEW_GAME_STARTED
    }
}

const loadingStarted = () => {
    return {
        type: actions.LOADING_STARTED
    };
};

const questionLoaded = (question) => {
    return {
        type: actions.QUESTION_LOADED,
        question: question
    };
};

const incScore = () => {
    return {
        type: actions.INC_SCORE
    };
};

const gameOver = () => {
    return {
        type: actions.GAME_OVER
    };
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actions.NEW_GAME_STARTED:
            return { ...state, currentScore: 0, currentQuestion: null, gameOver: false };
        case actions.LOADING_STARTED:
             return { ...state, currentQuestion: null };
        case actions.QUESTION_LOADED:
             return { ...state, currentQuestion: action.question };
        case actions.INC_SCORE:
              return { ...state, currentScore: state.currentScore + 1 };
        case actions.GAME_OVER:
            return { ...state, gameOver: true };
        default:
            return state
    }
}

export default class Game extends Component {
    render() {
        const dispatch = this.props.store.dispatch;
        if(!this.props.gameOver) {
            return (
                <div>
                    {this.props.currentQuestion == null ?
                        <Loader />:
                        <Question
                            question={this.props.currentQuestion}
                            correctAnswerClicked={() => { dispatch(correctAnswerClicked()); }}
                            incorrectAnswerClicked={() => { dispatch(gameOver()); }}
                        />
                    }
                    Current score: {this.props.currentScore}
                </div>
            );
        } else {
            return (
                <div>
                    <GameOver score={this.props.currentScore} />
                    <a onClick={this.props.startGame}>Try again?</a>
                </div>
            );
        }
    }
}

export {
    actions,
    startGame,
    correctAnswerClicked,
    incorrectAnswerClicked,
    reducer,
    Game
}

import React, { Component } from 'react';

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export default class Question extends Component {
    correctAnswerClicked = () => {
        this.props.correctAnswerClicked();
    }
    incorrectAnswerClicked = () => {
        this.props.incorrectAnswerClicked();
    }
    render() {

        const incorrectAnswers = this.props.question.incorrect_answers;
        const answers = shuffle([
            { id: incorrectAnswers.length + 1, correct: true, text: this.props.question.correct_answer },
            ...incorrectAnswers.map((answer, index) => {
                return { id: index, correct: false, text: answer };
            })
        ]);

        return (<div className="question">
            <div className="question__text" dangerouslySetInnerHTML={{__html: this.props.question.question}}>
            </div>
            <div className="question__category">

            </div>
            <div className="question__answers">
                {answers.map(answer => {
                    return (
                        <div className="question__answers__answer" key={answer.id} onClick={() => answer.correct ? this.correctAnswerClicked() : this.incorrectAnswerClicked()}>
                            {answer.text}
                        </div>
                    );
                })}
            </div>
        </div>);
    }
}

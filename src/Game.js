import React from 'react';
import Content from "./Content";
import Actionbar from "./Actionbar";
import Score from './Score'
export default class Game extends React.Component {
    render() {
        console.log('is it finished ? ' + this.props.finished);
        return (
            <div className={"gameContainer"}>
              <Content
              onQuestionAnswer ={ this.props.onQuestionAnswer}
              question={this.props.question}
              tips = {this.props.question.tips}
              isFinished={this.props.finished}/>
                <Actionbar
                    currentQuestion = {this.props.currentQuestion}
                    onNextQuestion = {this.props.onNextQuestion}
                    isLastQuestion = {this.props.isLastQuestion}
                    onPreviousQuestion = {this.props.onPreviousQuestion}
                    isFirstQuestion = {this.props.isFirstQuestion}
                    onSubmit= {this.props.onSubmit}
                    isFinished={this.props.finished}
                    restart={this.props.restart}
                />
              <Score score={this.props.score} isFinished={this.props.finished}/>
            </div>
        );
    }
}

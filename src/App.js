import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import {
    changeQuestion, initQuestions, questionAnswer, submit, decreaseCounter, startCounter,
    resetCounter
} from "./redux/actions";

import Game from './Game';
import Navbar from "./Navbar";

class App extends Component {
    constructor(props){
        super(props);
        this.previousQuestion = this.previousQuestion.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.submitQuestions = this.submitQuestions.bind(this);
        this.loadQuizzes = this.loadQuizzes.bind(this);
        this.restart = this.restart.bind(this);
        this.createTimer = this.createTimer.bind(this);
        this.deleteTimer = this.deleteTimer.bind(this);
        this.startCounter = this.startCounter.bind(this);
        this.timer = this.createTimer();

    }
    previousQuestion(){
        this.props.dispatch(changeQuestion(this.props.currentQuestion-1, this.props.questions.length));
    }
    nextQuestion(){
        this.props.dispatch(changeQuestion(this.props.currentQuestion+1, this.props.questions.length));
    }
    submitQuestions(){
        this.props.dispatch(submit(this.props.questions));
        this.props.dispatch(resetCounter());

    }

    loadQuizzes(quizzes){
        fetch("https://quiz2019.herokuapp.com/api/quizzes/random10wa?token=17f7c4049dc98483ec00")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                json.map((item) => {
                    if(item.question) {
                         quizzes.push(item);
                    }
                    return 0;
                });
                this.props.dispatch(initQuestions(quizzes));
            })
    }

    createTimer(){
        return setInterval(() => {
            if(this.props.time > 0){
                this.props.dispatch(decreaseCounter());
            } else {
                this.submitQuestions();
            }
        }, 1000)
    }

    deleteTimer(){
        clearInterval(this.timer);
        this.timer = 0;
    }

    startCounter(){
        this.props.dispatch(startCounter());
    }

    restart(){
        let quizzes = [];
        this.loadQuizzes(quizzes);
        this.deleteTimer();
        this.startCounter();
        this.timer = this.createTimer();
    }
    componentDidMount(){
        let quizzes = [];
        this.loadQuizzes(quizzes);
    }
    render() {

        let currentQuestion = this.props.currentQuestion;
        let numQuestions = this.props.questions.length;

        let isFirstQuestion = currentQuestion === 0;
        let isLastQuestion = (currentQuestion === (numQuestions-1));

        return (
            <div className="App">
               <Navbar title={"QuizGame"} time={this.props.time}/>
                {this.props.questions.length > 0 ?
                    (
                        <div className={"mainContainer"}>
                            <Game question={this.props.questions[this.props.currentQuestion]}
                                  currentQuestion = {this.props.currentQuestion}
                                  onQuestionAnswer={(answer) => {
                                      this.props.dispatch(questionAnswer(this.props.currentQuestion, answer))}}
                                  onSubmit = {this.submitQuestions}
                                  onNextQuestion = {this.nextQuestion}
                                  isLastQuestion = {isLastQuestion}
                                  onPreviousQuestion = {this.previousQuestion}
                                  isFirstQuestion = {isFirstQuestion}
                                  score = {this.props.score}
                                  finished = {this.props.finished}
                                  restart={this.restart}

                            />

                        </div>

                    ) :
                    (
                        <div className={"noQuestions"}> Cargando las preguntas... </div>
                    )
                }

            </div>
        );
    }
}
  function mapStateToProps(state){
    return{
        ...state
    };
    }

export default connect(mapStateToProps)(App);

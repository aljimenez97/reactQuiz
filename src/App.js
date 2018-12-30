import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import {
    changeQuestion, initQuestions, questionAnswer, submit, decreaseCounter, startCounter,
    resetCounter
} from "./redux/actions";

import Game from './Game';
import Navbar from "./Navbar";
import Counter from "./Counter";

class App extends Component {
    constructor(props){
        super(props);
        this.previousQuestion = this.previousQuestion.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.submitQuestions = this.submitQuestions.bind(this);
        this.loadQuizzes = this.loadQuizzes.bind(this);
        this.restart = this.restart.bind(this);
        this.modifyCounter = this.modifyCounter.bind(this);
        this.startCounter = this.startCounter.bind(this);

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
                });
                console.log(quizzes)
                this.props.dispatch(initQuestions(quizzes));
            })
    }

    modifyCounter(){
        let myTimer = 120;
            let myVar = setInterval(() => {
                if(myTimer > 0){
                    myTimer--;
                    this.props.dispatch(decreaseCounter());
                } else {
                    myTimer = this.props.time;
                    clearInterval(myVar);
                    this.submitQuestions();
                }
            }, 1000)

    }

    startCounter(){
        this.props.dispatch(startCounter());
    }

    restart(){
        let quizzes = [];
        this.loadQuizzes(quizzes);
        this.startCounter();
        this.modifyCounter();
    }
    componentDidMount(){
        let quizzes = [];
        this.loadQuizzes(quizzes);
        this.modifyCounter();
    }
    render() {

        let currentQuestion = this.props.currentQuestion;
        let numQuestions = this.props.questions.length;

        let isFirstQuestion = currentQuestion === 0;
        let isLastQuestion = (currentQuestion === (numQuestions-1));

        return (
            <h1 className="App">
               <Navbar aria-role={"heading"} title={"QuizGame"}/>
                {this.props.questions.length > 0 ?
                    (
                        <h2 className={"mainContainer"}>
                            <Counter time={this.props.time} count={this.modifyCounter}/>
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

                        </h2>

                    ) :
                    (
                        <h2 className={"noQuestions"}> Cargando las preguntas... </h2>
                    )
                }

            </h1>
        );
    }
}
  function mapStateToProps(state){
    return{
        ...state
    };
    }

export default connect(mapStateToProps)(App);

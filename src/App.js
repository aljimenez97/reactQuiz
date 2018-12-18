import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import {changeQuestion, initQuestions, questionAnswer, submit} from "./redux/actions";

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

    }
    previousQuestion(){
        this.props.dispatch(changeQuestion(this.props.currentQuestion-1, this.props.questions.length));
    }
    nextQuestion(){
        this.props.dispatch(changeQuestion(this.props.currentQuestion+1, this.props.questions.length));
    }
    submitQuestions(){
        this.props.dispatch(submit(this.props.questions));
    }

    /*loadQuizzes(page, quizzes){
        fetch("https://quiz2019.herokuapp.com/api/quizzes?token=17f7c4049dc98483ec00&pageno="+page)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if(json.quizzes.length !== 0){
                    json.quizzes.map((item) => {
                        quizzes.push(item)
                    });
                    this.loadQuizzes(page+1, quizzes);
                } else{
                    this.props.dispatch(initQuestions(quizzes));
                }
            })
    }*/
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
                this.props.dispatch(initQuestions(quizzes));
            })
    }

    restart(){
        let quizzes = [];
        this.loadQuizzes(quizzes);
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
               <Navbar title={"QuizGame"}/>
                {this.props.questions.length > 0 ?
                    (
                        <Game question={this.props.questions[this.props.currentQuestion]}
                              currenrtQuestion = {this.props.currentQuestion}
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
                    ) :
                    (
                        <div>No hay preguntas =(</div>
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

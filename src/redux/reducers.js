import { combineReducers } from 'redux';
import {CHANGE_QUESTION, INIT_QUESTIONS, QUESTION_ANSWER, SUBMIT, DECREASE_COUNTER, START_COUNTER, RESET_COUNTER} from "./actions";

function score(state = 0, action = {}) {
    switch(action.type){
        case SUBMIT:
            let score = 0;
            action.payload.questions.map((question) => {
                return score += (question.userAnswer === question.answer) ? 1 : 0;
            });
            return score;
        case INIT_QUESTIONS:
            let s = 0;
            return s;
        default:
            return state;
    }
}

function finished(state = false, action = {}) {
    switch(action.type) {
        case SUBMIT:
            let finished = true;
            return finished;
        case INIT_QUESTIONS:
            let restart = false;
            return restart;
        default:
            return state;
    }
 }

function currentQuestion(state = 0, action = {}) {
    switch(action.type) {
        case CHANGE_QUESTION:
            if(action.payload.index < 0){
                return state;
            }
            if(action.payload.index >= action.payload.numQuestions){
                return state
            }
            return action.payload.index ;
        case INIT_QUESTIONS:
            let current = 0;
            return current;
        default:
            return state;
    }
}

function questions(state = [], action = {}) {
    switch(action.type) {
        case QUESTION_ANSWER:
            // Itero por todas las questions y modifico el campo userAnswer de la que acabo de responder
            return state.map((question,i) => {
                return { ...question,
                        userAnswer: action.payload.index === i ? action.payload.answer : question.userAnswer
                }
            });
        case INIT_QUESTIONS:
            let newQuestions=JSON.parse(JSON.stringify(action.payload.questions));
            return newQuestions;
        default:
            return state;
    }
}

function time(state = 120, action={}) {
    switch(action.type) {
        case DECREASE_COUNTER:
            let c = --state;
            return c;
        case START_COUNTER:
            let a = 120;
            return a;
        case RESET_COUNTER:
            let b = 0;
            return 0;
        default:
            return state;
    }
}
const GlobalState = (combineReducers({
    score,
    finished,
    currentQuestion,
    questions,
    time
}));

export default GlobalState;

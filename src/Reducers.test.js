import GlobalState from './redux/reducers'
import * as types from "./redux/actions";
import {mount, shallow} from 'enzyme';
import Content from "./Content";
import Game from './Game';
import ReactDOM from 'react-dom';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import configureStore from 'redux-mock-store'



describe('global reducer', () => {

    let mockStore = configureStore();
    let store = mockStore();
    beforeEach(() => { // Runs before each test in the suite
        store.clearActions();
    });

    it('should return the initial state', () => {
        let initialState  = {
            score: 0,
            finished: false,
            currentQuestion: 0,
            questions: [],
            time: 120
        };

        let action  = {type:'dummy_action'};

        expect(GlobalState(undefined, action)).toEqual(initialState)
    })

    describe('test for all the reducers', () => {

        it('returns the correct state for INIT_QUESTIONS', () => {
            let q = [
                {
                    answer: "Tokyo",
                    attachment: {
                        filename: "tokyo.jpg",
                        mime: "image/jpeg",
                        url: "https://res.cloudinary.com/core-upm/image/upload/v1533286607/core/quiz2018/attachments/m5stbgemzdgqnihwoyse.jpg"
                    },
                    author: {
                        isAdmin: false,
                        username: "slp"
                    },
                    favourite: false,
                    id: 0,
                    question: "Capital of Japan",
                    tips: ["La respuesta está en inglés"]

                },
                {
                    answer: "Madrid",
                    attachment: {
                        filename: "tokyo.jpg",
                        mime: "image/jpeg",
                        url: "https://res.cloudinary.com/core-upm/image/upload/v1533286607/core/quiz2018/attachments/m5stbgemzdgqnihwoyse.jpg"
                    },
                    author: {
                        isAdmin: false,
                        username: "cvm"
                    },
                    favourite: false,
                    id: 1,
                    question: "Capital of Spain",
                    tips: ["La respuesta está en inglés"]

                }
            ];
            let action = { type: types.INIT_QUESTIONS, payload: {questions:q} };
            let expectedState = {
                score: 0,
                finished: false,
                currentQuestion: 0,
                questions: q,
                time: 120 };

            expect(GlobalState(undefined, action)).toEqual(expectedState);
        });

        it('CHANGE_QUESTION -> "currentQuestion" should be 1', () => {
            let q = [
                {
                    answer: "Tokyo",
                    attachment: {
                        filename: "tokyo.jpg",
                        mime: "image/jpeg",
                        url: "https://res.cloudinary.com/core-upm/image/upload/v1533286607/core/quiz2018/attachments/m5stbgemzdgqnihwoyse.jpg"
                    },
                    author: {
                        isAdmin: false,
                        username: "slp"
                    },
                    favourite: false,
                    id: 0,
                    question: "Capital of Japan",
                    tips: ["La respuesta está en inglés"]

                },
                {
                    answer: "Madrid",
                    attachment: {
                        filename: "tokyo.jpg",
                        mime: "image/jpeg",
                        url: "https://res.cloudinary.com/core-upm/image/upload/v1533286607/core/quiz2018/attachments/m5stbgemzdgqnihwoyse.jpg"
                    },
                    author: {
                        isAdmin: false,
                        username: "cvm"
                    },
                    favourite: false,
                    id: 1,
                    question: "Capital of Spain",
                    tips: ["La respuesta está en inglés"]

                }
            ];
            let action = { type: types.CHANGE_QUESTION, payload: {index:1, numQuestions:q.length} };
            let state = {
                score: 0,
                finished: false,
                currentQuestion: 0,
                questions: q,
                time: 120 };
            let expectedState = {
                score: 0,
                finished: false,
                currentQuestion: 1,
                questions: q,
                time: 120 };

            expect(GlobalState(state, action)).toEqual(expectedState);
        });

        it('QUESTION_ANSWER -> "question" should have the attribute userAnswer ', () => {
            let q = [
                {
                    answer: "Tokyo",
                    attachment: {
                        filename: "tokyo.jpg",
                        mime: "image/jpeg",
                        url: "https://res.cloudinary.com/core-upm/image/upload/v1533286607/core/quiz2018/attachments/m5stbgemzdgqnihwoyse.jpg"
                    },
                    author: {
                        isAdmin: false,
                        username: "slp"
                    },
                    favourite: false,
                    id: 0,
                    question: "Capital of Japan",
                    tips: ["La respuesta está en inglés"]

                },
                {
                    answer: "Madrid",
                    attachment: {
                        filename: "tokyo.jpg",
                        mime: "image/jpeg",
                        url: "https://res.cloudinary.com/core-upm/image/upload/v1533286607/core/quiz2018/attachments/m5stbgemzdgqnihwoyse.jpg"
                    },
                    author: {
                        isAdmin: false,
                        username: "cvm"
                    },
                    favourite: false,
                    id: 1,
                    question: "Capital of Spain",
                    tips: ["La respuesta está en inglés"]

                }
            ];
            let qAnswered = [
                {
                    answer: "Tokyo",
                    attachment: {
                        filename: "tokyo.jpg",
                        mime: "image/jpeg",
                        url: "https://res.cloudinary.com/core-upm/image/upload/v1533286607/core/quiz2018/attachments/m5stbgemzdgqnihwoyse.jpg"
                    },
                    author: {
                        isAdmin: false,
                        username: "slp"
                    },
                    favourite: false,
                    id: 0,
                    question: "Capital of Japan",
                    tips: ["La respuesta está en inglés"],
                    userAnswer: "HongKong"

                },
                {
                    answer: "Madrid",
                    attachment: {
                        filename: "tokyo.jpg",
                        mime: "image/jpeg",
                        url: "https://res.cloudinary.com/core-upm/image/upload/v1533286607/core/quiz2018/attachments/m5stbgemzdgqnihwoyse.jpg"
                    },
                    author: {
                        isAdmin: false,
                        username: "cvm"
                    },
                    favourite: false,
                    id: 1,
                    question: "Capital of Spain",
                    tips: ["La respuesta está en inglés"]

                }
            ];
            let answer = "HongKong"
            let action = { type: types.QUESTION_ANSWER, payload: {index:0, answer: answer} };
            let state = {
                score: 0,
                finished: false,
                currentQuestion: 0,
                questions: q,
                time: 120 };
            let expectedState = {
                score: 0,
                finished: false,
                currentQuestion: 0,
                questions: qAnswered,
                time: 120 };

            expect(GlobalState(state, action)).toEqual(expectedState);
        });

        it('SUBMIT -> "score" should be 1 and "finished" should be true', () => {
            let q = [
                {
                    answer: "Tokyo",
                    attachment: {
                        filename: "tokyo.jpg",
                        mime: "image/jpeg",
                        url: "https://res.cloudinary.com/core-upm/image/upload/v1533286607/core/quiz2018/attachments/m5stbgemzdgqnihwoyse.jpg"
                    },
                    author: {
                        isAdmin: false,
                        username: "slp"
                    },
                    favourite: false,
                    id: 0,
                    question: "Capital of Japan",
                    tips: ["La respuesta está en inglés"]

                },
                {
                    answer: "Madrid",
                    attachment: {
                        filename: "tokyo.jpg",
                        mime: "image/jpeg",
                        url: "https://res.cloudinary.com/core-upm/image/upload/v1533286607/core/quiz2018/attachments/m5stbgemzdgqnihwoyse.jpg"
                    },
                    author: {
                        isAdmin: false,
                        username: "cvm"
                    },
                    favourite: false,
                    id: 1,
                    question: "Capital of Spain",
                    tips: ["La respuesta está en inglés"]

                }
            ];
            let qAnswered = [
                {
                    answer: "Tokyo",
                    attachment: {
                        filename: "tokyo.jpg",
                        mime: "image/jpeg",
                        url: "https://res.cloudinary.com/core-upm/image/upload/v1533286607/core/quiz2018/attachments/m5stbgemzdgqnihwoyse.jpg"
                    },
                    author: {
                        isAdmin: false,
                        username: "slp"
                    },
                    favourite: false,
                    id: 0,
                    question: "Capital of Japan",
                    tips: ["La respuesta está en inglés"],
                    userAnswer: "Tokyo"

                },
                {
                    answer: "Madrid",
                    attachment: {
                        filename: "tokyo.jpg",
                        mime: "image/jpeg",
                        url: "https://res.cloudinary.com/core-upm/image/upload/v1533286607/core/quiz2018/attachments/m5stbgemzdgqnihwoyse.jpg"
                    },
                    author: {
                        isAdmin: false,
                        username: "cvm"
                    },
                    favourite: false,
                    id: 1,
                    question: "Capital of Spain",
                    tips: ["La respuesta está en inglés"]

                }
            ];
            let action = { type: types.SUBMIT, payload: {questions:qAnswered} };
            let state = {
                score: 0,
                finished: false,
                currentQuestion: 0,
                questions: q,
                time: 120 };
            let expectedState = {
                score: 1,
                finished: true,
                currentQuestion: 0,
                questions: q,
                time: 120 };

            expect(GlobalState(state, action)).toEqual(expectedState);
        });

        it('DECREASE_COUNTER -> "time" should be 119', () => {
            let q = [
                {
                    answer: "Tokyo",
                    attachment: {
                        filename: "tokyo.jpg",
                        mime: "image/jpeg",
                        url: "https://res.cloudinary.com/core-upm/image/upload/v1533286607/core/quiz2018/attachments/m5stbgemzdgqnihwoyse.jpg"
                    },
                    author: {
                        isAdmin: false,
                        username: "slp"
                    },
                    favourite: false,
                    id: 0,
                    question: "Capital of Japan",
                    tips: ["La respuesta está en inglés"]

                },
                {
                    answer: "Madrid",
                    attachment: {
                        filename: "tokyo.jpg",
                        mime: "image/jpeg",
                        url: "https://res.cloudinary.com/core-upm/image/upload/v1533286607/core/quiz2018/attachments/m5stbgemzdgqnihwoyse.jpg"
                    },
                    author: {
                        isAdmin: false,
                        username: "cvm"
                    },
                    favourite: false,
                    id: 1,
                    question: "Capital of Spain",
                    tips: ["La respuesta está en inglés"]

                }
            ];
            let action = { type: types.DECREASE_COUNTER};
            let state = {
                score: 0,
                finished: false,
                currentQuestion: 0,
                questions: q,
                time: 120 };
            let expectedState = {
                score: 0,
                finished: false,
                currentQuestion: 0,
                questions: q,
                time: 119 };

            expect(GlobalState(state, action)).toEqual(expectedState);
        });

        it('START_COUNTER -> "time" should be 120', () => {
            let q = [
                {
                    answer: "Tokyo",
                    attachment: {
                        filename: "tokyo.jpg",
                        mime: "image/jpeg",
                        url: "https://res.cloudinary.com/core-upm/image/upload/v1533286607/core/quiz2018/attachments/m5stbgemzdgqnihwoyse.jpg"
                    },
                    author: {
                        isAdmin: false,
                        username: "slp"
                    },
                    favourite: false,
                    id: 0,
                    question: "Capital of Japan",
                    tips: ["La respuesta está en inglés"]

                },
                {
                    answer: "Madrid",
                    attachment: {
                        filename: "tokyo.jpg",
                        mime: "image/jpeg",
                        url: "https://res.cloudinary.com/core-upm/image/upload/v1533286607/core/quiz2018/attachments/m5stbgemzdgqnihwoyse.jpg"
                    },
                    author: {
                        isAdmin: false,
                        username: "cvm"
                    },
                    favourite: false,
                    id: 1,
                    question: "Capital of Spain",
                    tips: ["La respuesta está en inglés"]

                }
            ];
            let action = { type: types.START_COUNTER};
            let state = {
                score: 0,
                finished: false,
                currentQuestion: 0,
                questions: q,
                time: 0 };
            let expectedState = {
                score: 0,
                finished: false,
                currentQuestion: 0,
                questions: q,
                time: 120 };

            expect(GlobalState(state, action)).toEqual(expectedState);
        });



       /* it('should render a placeholder for the Content -> input', () => {
            let q = [
                {
                    answer: "Tokyo",
                    attachment: {
                        filename: "tokyo.jpg",
                        mime: "image/jpeg",
                        url: "https://res.cloudinary.com/core-upm/image/upload/v1533286607/core/quiz2018/attachments/m5stbgemzdgqnihwoyse.jpg"
                    },
                    author: {
                        isAdmin: false,
                        username: "slp"
                    },
                    favourite: false,
                    id: 0,
                    question: "Capital of Japan",
                    tips: ["La respuesta está en inglés"]

                },
                {
                    answer: "Madrid",
                    attachment: {
                        filename: "tokyo.jpg",
                        mime: "image/jpeg",
                        url: "https://res.cloudinary.com/core-upm/image/upload/v1533286607/core/quiz2018/attachments/m5stbgemzdgqnihwoyse.jpg"
                    },
                    author: {
                        isAdmin: false,
                        username: "cvm"
                    },
                    favourite: false,
                    id: 1,
                    question: "Capital of Spain",
                    tips: ["La respuesta está en inglés"]

                }
            ];
            let placeholder_text = "Write your answer here..."
            let wrapper = mount(<Content onQuestionAnswer={(answer) => {
                this.props.dispatch(questionAnswer(this.props.currentQuestion, answer))}}
                                           question={q[0]}
                                           tips = {q[0].tips}
                                           isFinished={false}/>);
            let input = wrapper.find('input');
            expect(input.prop('placeholder')).toEqual(placeholder_text);
        });*/


    });


})
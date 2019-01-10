import React from 'react';
import App from './App';
import Navbar from "./Navbar";
import configureStore from 'redux-mock-store'

import {mount} from 'enzyme';
import {Provider} from "react-redux";

const mockStore = configureStore()
let store,wrapper
let initialState  = {
    score: 0,
    finished: false,
    currentQuestion: 0,
    questions: [],
    time: 120
};

beforeEach(()=>{
    store = mockStore(initialState)
    wrapper = mount( <Provider store={store}><App /></Provider> )
})

it('renders without crashing', () => {
    const h = <Navbar title={"QuizGame"} time={initialState.time}/>;
    expect(wrapper.contains(h)).toEqual(true);
});
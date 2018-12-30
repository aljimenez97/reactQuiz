export const QUESTION_ANSWER = 'QUESTION_ANSWER';
export const CHANGE_QUESTION = 'CHANGE_QUESTION';
export const SUBMIT = 'SUBMIT';
export const INIT_QUESTIONS = 'INIT_QUESTIONS';
export const DECREASE_COUNTER = 'DECREASE_COUNTER';
export const START_COUNTER = 'START_COUNTER';
export const RESET_COUNTER = 'RESET_COUNTER';



export function questionAnswer(index, answer) {
    return { type: QUESTION_ANSWER, payload: { index, answer } };
}

export function changeQuestion(index, numQuestions) {
    return { type: CHANGE_QUESTION, payload: { index, numQuestions } };
}

export function submit(questions) {
    return { type: SUBMIT, payload: { questions } };
}

export function initQuestions(questions) {
    return { type: INIT_QUESTIONS, payload: { questions } };
}

export function decreaseCounter() {
    return { type: DECREASE_COUNTER };
}

export function startCounter() {
    return { type: START_COUNTER };
}

export function resetCounter() {
    return { type: RESET_COUNTER };
}


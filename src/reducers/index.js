import { SET_SCORE, SET_RADIO } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
        case SET_SCORE: return { ...state, score: action.score };
        case SET_RADIO: return { ...state, radio: action.radio };
        default: return state;
    }
}
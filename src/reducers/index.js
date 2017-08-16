import { SET_SCORE } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
        case SET_SCORE: return { ...state, score: action.score };
        default: return state;
    }
}
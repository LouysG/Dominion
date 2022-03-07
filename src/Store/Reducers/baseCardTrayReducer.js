import {stackReducer} from './stackReducer.js';

export function baseCardTrayReducer (state, action) {

    if (action.type === 'addToTrash') {
        return {
            ...state,
            trash: [action.payload, ...state.trash]
        }
    }

    switch (action.stack) {
        case 'copperStack':
            return {
                ...state,
                copperStack: stackReducer(state.copperStack, action), 
            }
        case 'silverStack':
            return {
                ...state,
                silverStack: stackReducer(state.silverStack, action), 
            }
        case 'goldStack':
            return {
                ...state,
                goldStack: stackReducer(state.goldStack, action), 
            }
        case 'estateStack':
            return {
                ...state,
                estateStack: stackReducer(state.estateStack, action), 
            }
        case 'duchyStack':
            return {
                ...state,
                duchyStack: stackReducer(state.duchyStack, action), 
            }
        case 'provinceStack':
            return {
                ...state,
                provinceStack: stackReducer(state.provinceStack, action), 
            }
        case 'curseStack':
            return {
                ...state,
                curseStack: stackReducer(state.curseStack, action), 
            }
        default:
            return state;
    }
}
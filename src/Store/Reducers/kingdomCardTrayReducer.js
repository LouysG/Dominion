import {stackReducer} from './stackReducer.js';

export function kingdomCardTrayReducer (state, action) {
    switch (action.stack) {
        case 'kingdomStack1':
            return {
                ...state,
                kingdomStack1: stackReducer(state.kingdomStack1, action), 
            }
        case 'kingdomStack2':
            return {
                ...state,
                kingdomStack2: stackReducer(state.kingdomStack2, action), 
            }
        case 'kingdomStack3':
            return {
                ...state,
                kingdomStack3: stackReducer(state.kingdomStack3, action), 
            }
        case 'kingdomStack4':
            return {
                ...state,
                kingdomStack4: stackReducer(state.kingdomStack4, action), 
            }
        case 'kingdomStack5':
            return {
                ...state,
                kingdomStack5: stackReducer(state.kingdomStack5, action), 
            }
        case 'kingdomStack6':
            return {
                ...state,
                kingdomStack6: stackReducer(state.kingdomStack6, action), 
            }
        case 'kingdomStack7':
            return {
                ...state,
                kingdomStack7: stackReducer(state.kingdomStack7, action), 
            }
        case 'kingdomStack8':
            return {
                ...state,
                kingdomStack8: stackReducer(state.kingdomStack8, action), 
            }
        case 'kingdomStack9':
            return {
                ...state,
                kingdomStack9: stackReducer(state.kingdomStack9, action), 
            }
        case 'kingdomStack10':
            return {
                ...state,
                kingdomStack10: stackReducer(state.kingdomStack10, action), 
            }
        default:
            return state;
    }
}
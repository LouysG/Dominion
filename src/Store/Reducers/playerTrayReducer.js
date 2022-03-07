import {playerReducer} from './playerReducer.js'

export function playerTrayReducer (state, action) {
    switch (action.player) {
        case 'player1':
            return {
                ...state,
                player1: playerReducer(state.player1, action),
            }
        case 'player2':
            return {
                ...state,
                player2: playerReducer(state.player2, action),
            }
        case 'player3':
            return {
                ...state,
                player3: playerReducer(state.player3, action),
            }
        case 'player4':
            return {
                ...state,
                player4: playerReducer(state.player4, action),
            }
        default: 
            return state;
    }
}
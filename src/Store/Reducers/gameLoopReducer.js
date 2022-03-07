import gamePhaseReducer from './gamePhaseReducer.js';
import activePlayerReducer from './activePlayerReducer.js';
import turnPhaseReducer from './turnPhaseReducer.js';
import buySubphaseReducer from './buySubphaseReducer.js';
import actionSubphaseReducer from './actionSubphaseReducer.js';
import updateGameStateReducer from './updateGameStateReducer.js';
import { canPassReducer } from './canPassReducer.js';
import victoryScreenReducer from './victoryScreenReducer.js';

export function gameLoopReducer (state, action) {
    if (action.type === 'pass') {
        if (action.turnPhase === 'action' && action.actionSubphase === 'playActions') {
            return {
                ...state,
                turnPhase: 'buy',
                updateGameState: true
            }
        }
        if (action.turnPhase === 'action' && action.actionSubphase === 'resolveEffects') {
            return {
                ...state,
                actionSubphase: 'playActions',
                updateGameState: true
            }
        }
        if (action.turnPhase === 'buy' && action.buySubphase === 'playTreasure') {
            return {
                ...state,
                buySubphase: 'buyCards',
                updateGameState: true
            }
        }
        if (action.turnPhase === 'buy' && action.buySubphase === 'buyCards') {
            return {
                ...state,
                buySubphase: 'playTreasure',
                turnPhase: 'cleanUp',
                updateGameState: true
            }
        }
        
    }







    return {
        ...state,
        gamePhase: gamePhaseReducer(state.gamePhase, action),
        activePlayer: activePlayerReducer(state.activePlayer, action),
        turnPhase: turnPhaseReducer(state.turnPhase, action),
        actionSubphase: actionSubphaseReducer(state.actionSubphase, action),
        buySubphase: buySubphaseReducer(state.buySubphase, action),
        updateGameState: updateGameStateReducer(state.updateGameState, action),
        canPass: canPassReducer(state.canPass, action),
        victoryScreen: victoryScreenReducer(state.victoryScreen, action)
    }
}
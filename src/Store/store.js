import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Copper from '../Cards/Copper.js';
import rootReducer from './Reducers/rootReducer.js';

export const initialState = {
    playerTray: {
        player1: {
            name: 'Player 1',
            hand: [],
            handSegment: 0,
            deck: [],
            discard: [],
            victoryPoints: 0
        },
        player2: {
            name: 'Player 2',
            hand: [],
            deck: [],
            discard: [],
            victoryPoints: 0
        },
        player3: {
            name: 'Player',
            hand: [],
            deck: [],
            discard: [],
            victoryPoints: 0
        },
        player4: {
            name: 'Player 3',
            hand: [],
            deck: [],
            discard: [],
            victoryPoints: 0
        }
    },
    kingdomCardTray: {
        kingdomStack1: [],
        kingdomStack2: [],
        kingdomStack3: [],
        kingdomStack4: [],
        kingdomStack5: [],
        kingdomStack6: [],
        kingdomStack7: [],
        kingdomStack8: [],
        kingdomStack9: [],
        kingdomStack10: [],
    },
    baseCardTray: {
        copperStack: [],
        silverStack: [],
        goldStack: [],
        estateStack: [],
        duchyStack: [],
        provinceStack: [],
        curseStack: [],
        trash: []
    },
    playArea: {
        inPlay: [],
        inPlaySegment: 0,
        actions: 1,
        buys: 1,
        gold: 0,
        selectorTray: [],
        selectorMessage: '',
        selectorTrayIsVisible: false,
        selectorTraySegment: 0,
        setAsideTray: [],
        optionalButtons: {
            button1: {
                visible: false,
                text: '',
                onSelect: '',
            },
            button2: {
                visible: false,
                text: '',
                onSelect: '',
            },
            button3: {
                visible: false,
                text: '',
                onSelect: '',
            }
        }
    },
    gameLoop: {
        gamePhase: 'setUp',
        activePlayer: 'player1',
        turnPhase: 'action',
        actionSubphase: 'playActions',
        buySubphase: 'playTreasure',
        updateGameState: true,
        canPass: false,
        victoryScreen: {
            victoryScreenIsVisible: false,
            winner: ''
        }
    },
    // Indicates which CardWrapper components rendered by the UI are selectable
    selectionCriteria: {
        unselectEverything: true,
        location: [],
        type: [],
        cost: [],
        name: '',
    },
    // Indicates what selectable CardWrapper components should do upon being clicked.
    // These actions are never effects, they almost always amount to moving cards
    // from one place on the board to another (e.g., draw, trash, discard, etc.)
    onSelect: {
        action: '',
    },
    theStack: {
        cards: [],
        effects: [],
        lastEffectOutput: {},
    },
    triggerEffects: {},
    callGetAction: {
        update: false,
        action: ''
    } 
}

function Middleware ({dispatch, getState}) {
    return next => action => {
        
        return next(action)
    }
}

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(Middleware))); 
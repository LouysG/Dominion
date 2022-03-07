import { initialState } from '../store.js';
import { playerTrayReducer } from './playerTrayReducer.js';
import { kingdomCardTrayReducer } from './kingdomCardTrayReducer.js';
import { baseCardTrayReducer } from './baseCardTrayReducer.js';
import { playAreaReducer } from './playAreaReducer.js';
import { gameLoopReducer } from './gameLoopReducer.js';
import { selectionCriteriaReducer } from './selectionCriteriaReducer.js';
import { onSelectReducer } from './onSelectReducer.js';
import {Copper, Silver, Gold, Estate, Duchy, Province, Curse} from '../../Cards/allCards.js';
import { theStackReducer } from './theStackReducer.js';
import { callGetActionReducer } from './callGetActionReducer.js';
import triggerEffectsReducer from './triggerEffectsReducer.js';

function shuffle(array) {
    let copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
    }
    return copy
}

export default function rootReducer (state = initialState, action) {
    switch (action.type) {
        case 'initialize':
            function dealStack (card, number) {
                let array = [];
                if (card.name === 'Gardens') {
                    number += 2
                }
                for (let i = 0; i < number; i++) {
                    array.push(new card(card.name + i));
                }
                return array;
            }  

            let initialDeck = []
            for (let i = 0; i < 7; i++) {
                if (i < 3) {
                    initialDeck.push(new Estate(null));
                }
                initialDeck.push(new Copper(null));
            }
    
            return {
                ...state,
                kingdomCardTray: {
                    ...state.kingdomCardTray,
                    kingdomStack1: dealStack(action.payload[0], 10),
                    kingdomStack2: dealStack(action.payload[1], 10),
                    kingdomStack3: dealStack(action.payload[2], 10),
                    kingdomStack4: dealStack(action.payload[3], 10),
                    kingdomStack5: dealStack(action.payload[4], 10),
                    kingdomStack6: dealStack(action.payload[5], 10),
                    kingdomStack7: dealStack(action.payload[6], 10),
                    kingdomStack8: dealStack(action.payload[7], 10),
                    kingdomStack9: dealStack(action.payload[8], 10),
                    kingdomStack10: dealStack(action.payload[9], 10)
                },
                baseCardTray: {
                    ...state.baseCardTray,
                    copperStack: dealStack(Copper, 60),
                    silverStack: dealStack(Silver, 40),
                    goldStack: dealStack(Gold, 30),
                    estateStack: dealStack(Estate, 21),
                    duchyStack: dealStack(Duchy, 12),
                    provinceStack: dealStack(Province, 12),
                    curseStack: dealStack(Curse, 20)
                },
                playerTray: {
                    ...state.playerTray,
                    player1: {
                        ...state.playerTray.player1,
                        deck: initialDeck,
                       //hand: [new Copper(null), new Silver(null), new Gold(null), new Estate(null), new Festival(null)],
                    },
                    player2: {
                        ...state.playerTray.player2,
                        deck: initialDeck
                    },
                    player3: {
                        ...state.playerTray.player3,
                        deck: initialDeck
                    },
                    player4: {
                        ...state.playerTray.player4,
                        deck: initialDeck
                    }
                },
                playArea: {
                    ...state.playArea,
                }
            }
        case 'drawNewDeck':
            if (action.player === 'player1') {
                let coppers = state.baseCardTray.copperStack.slice(0, 7)
                let newCopperStack = state.baseCardTray.copperStack.slice(7)
                let estates = state.baseCardTray.estateStack.slice(0, 3)
                let newEstateStack = state.baseCardTray.estateStack.slice(3)
                let newDeck = coppers.concat(estates)
                return {
                    ...state,
                    playerTray: {
                        ...state.playerTray,
                        player1: {
                            ...state.playerTray.player1,
                            deck: newDeck
                        }
                    },
                    baseCardTray: {
                        ...state.baseCardTray,
                        copperStack: newCopperStack,
                        estateStack: newEstateStack
                    }
                }
            }
            if (action.player === 'player2') {
                let coppers = state.baseCardTray.copperStack.slice(0, 7)
                let newCopperStack = state.baseCardTray.copperStack.slice(7)
                let estates = state.baseCardTray.estateStack.slice(0, 3)
                let newEstateStack = state.baseCardTray.estateStack.slice(3)
                let newDeck = coppers.concat(estates)
                return {
                    ...state,
                    playerTray: {
                        ...state.playerTray,
                        player2: {
                            ...state.playerTray.player2,
                            deck: newDeck
                        }
                    },
                    baseCardTray: {
                        ...state.baseCardTray,
                        copperStack: newCopperStack,
                        estateStack: newEstateStack
                    }
                }
            }
            if (action.player === 'player3') {
                let coppers = state.baseCardTray.copperStack.slice(0, 7)
                let newCopperStack = state.baseCardTray.copperStack.slice(7)
                let estates = state.baseCardTray.estateStack.slice(0, 3)
                let newEstateStack = state.baseCardTray.estateStack.slice(3)
                let newDeck = coppers.concat(estates)
                return {
                    ...state,
                    playerTray: {
                        ...state.playerTray,
                        player3: {
                            ...state.playerTray.player3,
                            deck: newDeck
                        }
                    },
                    baseCardTray: {
                        ...state.baseCardTray,
                        copperStack: newCopperStack,
                        estateStack: newEstateStack
                    }
                }
            }
            if (action.player === 'player4') {
                let coppers = state.baseCardTray.copperStack.slice(0, 7)
                let newCopperStack = state.baseCardTray.copperStack.slice(7)
                let estates = state.baseCardTray.estateStack.slice(0, 3)
                let newEstateStack = state.baseCardTray.estateStack.slice(3)
                let newDeck = coppers.concat(estates)
                return {
                    ...state,
                    playerTray: {
                        ...state.playerTray,
                        player4: {
                            ...state.playerTray.player4,
                            deck: newDeck
                        }
                    },
                    baseCardTray: {
                        ...state.baseCardTray,
                        copperStack: newCopperStack,
                        estateStack: newEstateStack
                    }
                }
            }
            break
        case 'drawToSelectorTray':
            let deck = state.playerTray.player1.deck
            let discard = state.playerTray.player1.discard
            if (deck.length > 0) {
                let card = deck[0]
                let newDeck = deck.slice(1)
                return {
                    ...state,
                    playerTray: {
                        ...state.playerTray,
                        player1: {
                            ...state.playerTray.player1,
                            deck: newDeck
                        }
                    },
                    playArea: {
                        ...state.playArea,
                        selectorTray: [
                            ...state.playArea.selectorTray,
                            card
                        ]
                    }
                }
            }
            if (deck.length === 0) {
                if (discard.length > 0) {
                    let shuffled = shuffle(discard)
                    let card = shuffled[0]
                    let newDeck = shuffled.slice(1)
                    return {
                        ...state,
                        playerTray: {
                            ...state.playerTray,
                            player1: {
                                ...state.playerTray.player1,
                                deck: newDeck,
                                discard: []
                            }
                        },
                        playArea: {
                            ...state.playArea,
                            selectorTray: [
                                ...state.playArea.selectorTray,
                                card
                            ]
                        }
                    }
                } else if (discard.length === 0) {
                    return {
                        ...state
                    }
                }
            }
            break
        case 'resetState':
            return initialState
        default:
            return {
                ...state,
                playerTray: playerTrayReducer(state.playerTray, action), 
                kingdomCardTray: kingdomCardTrayReducer(state.kingdomCardTray, action),
                baseCardTray: baseCardTrayReducer(state.baseCardTray, action),
                playArea: playAreaReducer(state.playArea, action),
                gameLoop: gameLoopReducer(state.gameLoop, action),
                selectionCriteria: selectionCriteriaReducer(state.selectionCriteria, action),
                onSelect: onSelectReducer(state.onSelect, action),
                theStack: theStackReducer(state.theStack, action),
                callGetAction: callGetActionReducer(state.callGetAction, action),
                triggerEffects: triggerEffectsReducer(state.triggerEffects, action)
            }
    }
}



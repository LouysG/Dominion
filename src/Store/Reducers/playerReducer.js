import {nameReducer} from './nameReducer.js';
import {deckReducer} from './deckReducer.js';
import {handReducer} from './handReducer.js';
import {discardReducer} from './discardReducer.js';
import {victoryPointsReducer} from './victoryPointsReducer.js';
import { handSegmentReducer } from './handSegmentReducer.js';


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


export function playerReducer (state, action) {
    if (action.type === 'drawCard') {
        if (state.deck.length > 0) {
            let card = state.deck[0]
            let newDeck = state.deck.slice(1)
            return {
                ...state,
                deck: newDeck,
                hand: [...state.hand, card]
            }
        }

        if (state.deck.length === 0) {
            if (state.discard.length > 0) {
                let shuffled = shuffle(state.discard)
                let card = shuffled[0]
                let newDeck = shuffled.slice(1)
                return {
                    ...state,
                    hand: [...state.hand, card],
                    deck: newDeck,
                    discard: []
                }
            } else if (state.discard.length === 0) {
                return {
                    ...state
                }
            }

        }
    }

    if (action.type === 'drawHand') {
        if (state.deck.length >= 5) {
            let hand = state.deck.slice(0, 5)
            let newDeck = state.deck.slice(5)
            return {
                ...state,
                deck: newDeck,
                hand: hand
            }
        } else if (state.deck.length < 5) {
            let remainingDeck = state.deck;
            let shuffled = shuffle(state.discard)
            let toDraw = 5 - remainingDeck.length
            let drawn = shuffled.slice(0, toDraw)
            let newDeck = shuffled.slice(toDraw)
            let newHand = remainingDeck.concat(drawn)
            return {
                ...state,
                deck: newDeck,
                hand: newHand,
                discard: [],
            } 
        }
    }

    if (action.type === 'discardHand') {
        let hand = state.hand
        let newDiscard = hand.concat(state.discard)
        return {
            ...state,
            hand: [],
            discard: newDiscard
        }
    }

    if (action.type === 'convertDiscardToDeck') {
        if (state.discard.length > 0) {
            let newDeck = shuffle(state.discard)
            return {
                ...state,
                deck: newDeck,
                discard: []
            }
        } else if (state.discard.length === 0) {
            return {
                ...state
            }
        }
    }
    
    
    
    return {
        ...state,
        name: nameReducer(state.name, action),
        deck: deckReducer(state.deck, action),
        hand: handReducer(state.hand, action),
        handSegment: handSegmentReducer(state.handSegment, action),
        discard: discardReducer(state.discard, action),
        victoryPoints: victoryPointsReducer(state.victoryPoints, action),
    }




}



import Card from './Card.js';
import full from '../Resources/Cards/artisan-full.jpg';
import half from '../Resources/Cards/artisan-half.jpg';
import { serialize } from './serialize.js';


function gainCard (dispatch, state, lastEffectOutput) { 
    dispatch({type: 'setSelectionCriteria',
        payload: {
            unselectEverything: false,
            location: ['baseCardTray', 'kingdomCardTray'],
            type: [],
            cost: ['<', 6],
            name: ''
        }
    })
    if (state.gameLoop.activePlayer === 'player1') {
        dispatch({type: 'setOnSelect',
            payload: {
                action: 'gainToHand'
            }
        })
        lastEffectOutput = {callAgain: false}
        return lastEffectOutput
    } else {
        dispatch({type: 'setOnSelect',
            payload: {
                action: 'doNothing'
            }
        })
        dispatch({type: 'callGetAction', payload: {
            update: true,
            action: 'gainToHand'
        }})
        lastEffectOutput = {callAgain: true}
        return lastEffectOutput 
    }
}

function topDeckCard (dispatch, state, lastEffectOutput) {
    if (state.gameLoop.activePlayer === 'player1') {
        dispatch({type: 'setSelectionCriteria',
            payload: {
                unselectEverything: false,
                location: ['player1Hand'],
                type: [],
                cost: [],
                name: ''
            }
        })
        dispatch({type: 'setOnSelect',
            payload: {
                action: 'putOnDeck'
            }
        })
        lastEffectOutput = {callAgain: false}
        return lastEffectOutput
    } else {
        dispatch({type: 'callGetAction', payload: {
            update: true,
            action: 'addToTop'
        }})
        lastEffectOutput = {callAgain: true}
        return lastEffectOutput 
    }
}

let serializedGainEffect = serialize(gainCard, {})
let serializedTopDeckEffect = serialize(topDeckCard, {})


export default class Artisan extends Card {
    constructor(id) {
        super('Artisan', id, 'action', 6);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedGainEffect, serializedTopDeckEffect]
    }
}
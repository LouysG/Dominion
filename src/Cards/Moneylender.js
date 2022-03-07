import Card from './Card.js';
import full from '../Resources/Cards/moneylender-full.jpg';
import half from '../Resources/Cards/moneylender-half.jpg';
import { serialize } from './serialize.js';


function effects(dispatch, state, lastEffectOutput) { 
    let activePlayer = state.gameLoop.activePlayer
    let hand = state.playerTray[activePlayer].hand
    let copperInHand = hand.filter(card => {
        if (card.name === 'Copper') {
            return true
        }
        return false
    })

    if (copperInHand.length === 0) {
        lastEffectOutput = {callAgain: true}
        return lastEffectOutput
    }

    dispatch({type: 'setSelectionCriteria',
        payload: {
            unselectEverything: false,
            location: ['player1Hand'],
            type: [],
            cost: [],
            name: 'Copper'
        }
    })
    dispatch({type: 'setOnSelect',
        payload: {
            action: 'trashMoneylender'
        }
    })
    lastEffectOutput = {callAgain: false}
    return lastEffectOutput
}

let serializedEffects = serialize(effects, {})


export default class Moneylender extends Card {
    constructor(id) {
        super('Moneylender', id, 'action', 4);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedEffects]
    }
}
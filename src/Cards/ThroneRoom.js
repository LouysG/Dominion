import Card from './Card.js';
import full from '../Resources/Cards/throneRoom-full.jpg';
import half from '../Resources/Cards/throneRoom-half.jpg';
import { serialize } from './serialize.js';


function effects(dispatch, state, lastEffectOutput) { 
    dispatch({type: 'setSelectionCriteria', 
    payload: {
        unselectEverything: false,
        location: ['player1Hand'],
        type: ['action', 'action-reaction', 'action-attack'],
        cost: [],
        name: ''
    }})

    dispatch({type: 'setOnSelect', 
        payload: {
            action: 'playThroneRoom',
    }})

    let actionsInHand = state.playerTray.player1.hand.filter(card => {
        if (card.type === 'action'
            || card.type === 'action-reaction'
            || card.type === 'action-attack') {
                return true
            }
        return false
    })

    if (actionsInHand.length < 1) {
        lastEffectOutput = {callAgain: true}
        return lastEffectOutput
    }

    lastEffectOutput = {callAgain: false}
    return lastEffectOutput
}

let serializedEffects = serialize(effects, {})

export default class ThroneRoom extends Card {
    constructor(id) {
        super('Throne Room', id, 'action', 4);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedEffects]
    }
}
import Card from './Card.js';
import full from '../Resources/Cards/remodel-full.jpg';
import half from '../Resources/Cards/remodel-half.jpg';
import { serialize } from './serialize.js';


function trashCard (dispatch, state, lastEffectOutput) { 
    let location = state.gameLoop.activePlayer + 'Hand'
    dispatch({type: 'setSelectionCriteria',
        payload: {
            unselectEverything: false,
            location: [location],
            type: [],
            cost: [],
            name: ''
        }
    })
    dispatch({type: 'setOnSelect',
        payload: {
            action: 'trashRemodel'
        }
    })
    lastEffectOutput = {callAgain: false}
    return lastEffectOutput     
}

function gainCard (dispatch, state, lastEffectOutput) {
    dispatch({type: 'setSelectionCriteria',
        payload: {
            unselectEverything: false,
            location: ['baseCardTray', 'kingdomCardTray'],
            type: [],
            cost: ['<', lastEffectOutput.trashedCardCost + 3],
            name: ''
        }
    })
    dispatch({type: 'setOnSelect',
        payload: {
            action: 'discard'
        }
    })
    lastEffectOutput = {callAgain: false}
    return lastEffectOutput
}


let serializedTrashEffect = serialize(trashCard, {})
let serializedGainEffect = serialize(gainCard, {})


export default class Remodel extends Card {
    constructor(id) {
        super('Remodel', id, 'action', 4);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedTrashEffect, serializedGainEffect]
    }
}
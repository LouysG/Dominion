import Card from './Card.js';
import full from '../Resources/Cards/mine-full.jpg';
import half from '../Resources/Cards/mine-half.jpg';
import { serialize } from './serialize.js';


function trashTreasure(dispatch, state, lastEffectOutput) { 
    dispatch({type: 'setSelectionCriteria',
        payload: {
            unselectEverything: false,
            location: ['player1Hand'],
            type: ['treasure'],
            cost: [],
            name: ''
        }
    })
    dispatch({type: 'setOnSelect',
        payload: {
            action: 'trashMine'
        }
    })
    lastEffectOutput = {callAgain: false}
    return lastEffectOutput
}

function gainTreasure (dispatch, state, lastEffectOutput) {
    dispatch({type: 'setSelectionCriteria',
        payload: {
            unselectEverything: false,
            location: ['baseCardTray'],
            type: ['treasure'],
            cost: ['<', lastEffectOutput.trashedCardCost + 4],
            name: ''
        }
    })
    dispatch({type: 'setOnSelect',
        payload: {
            action: 'gainToHand'
        }
    })
    lastEffectOutput = {callAgain: false}
    return lastEffectOutput
}


let serializedTrashTreasure = serialize(trashTreasure, {})
let serializedGainTreasure = serialize(gainTreasure, {})

export default class Mine extends Card {
    constructor(id) {
        super('Mine', id, 'action', 5);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedTrashTreasure, serializedGainTreasure]
    }
}
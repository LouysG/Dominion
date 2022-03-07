import Card from './Card.js';
import full from '../Resources/Cards/chapel-full.jpg';
import half from '../Resources/Cards/chapel-half.jpg';
import { serialize } from './serialize.js';

function effects(dispatch, state, lastEffectOutput) {
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
            action: 'trashChapel'
        }
    })
    dispatch({type: 'setCanPass', payload: true})
    dispatch({type: 'setLastEffectOutput', payload: 0})
    lastEffectOutput = {callAgain: false}
    return lastEffectOutput 
}


let serializedEffects = serialize(effects, {})


export default class Chapel extends Card {
    constructor(id) {
        super('Chapel', id, 'action', 2);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedEffects]
    }
}
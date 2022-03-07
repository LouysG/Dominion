import Card from './Card.js';
import full from '../Resources/Cards/smithy-full.jpg';
import half from '../Resources/Cards/smithy-half.jpg';
import { serialize } from './serialize.js'


function drawCard (dispatch, state, lastEffectOutput) { 
    let activePlayer = state.gameLoop.activePlayer
    for (let i = 0; i < 3; i++) {
        dispatch({type: 'drawCard', player: activePlayer})
    }
    lastEffectOutput = {callAgain: true}
    return lastEffectOutput;
}

let serializedEffects = serialize(drawCard, {})

export default class Smithy extends Card {
    constructor(id) {
        super('Smithy', id, 'action', 4);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedEffects]
    }
}
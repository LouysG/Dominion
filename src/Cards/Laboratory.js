import Card from './Card.js';
import full from '../Resources/Cards/laboratory-full.jpg';
import half from '../Resources/Cards/laboratory-half.jpg';
import { serialize } from './serialize.js';


function labEffects(dispatch, state, lastEffectOutput) { 
    let activePlayer = state.gameLoop.activePlayer
    dispatch({type: 'drawCard', player: activePlayer})
    dispatch({type: 'drawCard', player: activePlayer})
    dispatch({type: 'incrementActions', player: activePlayer})

    lastEffectOutput = {callAgain: true}
    return lastEffectOutput;
}

let serializedEffects = serialize(labEffects, {})

export default class Laboratory extends Card {
    constructor(id) {
        super('Laboratory', id, 'action', 5);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedEffects]
    }
}
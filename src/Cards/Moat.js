import Card from './Card.js';
import full from '../Resources/Cards/moat-full.jpg';
import half from '../Resources/Cards/moat-half.jpg';
import { serialize } from './serialize.js';


function effects(dispatch, state, lastEffectOutput) { 
    let activePlayer = state.gameLoop.activePlayer
    dispatch({type: 'drawCard', player: activePlayer})
    dispatch({type: 'drawCard', player: activePlayer})

    lastEffectOutput = {callAgain: true}
    return lastEffectOutput
}

let serializedEffects = serialize(effects, {})

export default class Moat extends Card {
    constructor(id) {
        super('Moat', id, 'action-reaction', 2);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedEffects]
    }
}
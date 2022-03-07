import Card from './Card.js';
import full from '../Resources/Cards/market-full.jpg';
import half from '../Resources/Cards/market-half.jpg';
import { serialize } from './serialize.js';

function labEffects(dispatch, state, lastEffectOutput) { 
    let activePlayer = state.gameLoop.activePlayer
    dispatch({type: 'drawCard', player: activePlayer})
    dispatch({type: 'incrementActions', player: activePlayer})
    dispatch({type: 'incrementBuys', player: activePlayer})
    dispatch({type: 'incrementGold', player: activePlayer})

    lastEffectOutput = {callAgain: true}
    return lastEffectOutput;
}

let serializedEffects = serialize(labEffects, {})

export default class Market extends Card {
    constructor(id) {
        super('Market', id, 'action', 5);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedEffects]
    }
}
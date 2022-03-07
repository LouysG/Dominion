import Card from './Card.js';
import full from '../Resources/Cards/festival-full.jpg';
import half from '../Resources/Cards/festival-half.jpg';
import { serialize } from './serialize.js';


function festivalEffect (dispatch, state, lastEffectOutput) { 
    let activePlayer = state.gameLoop.activePlayer
    dispatch({type: 'incrementActions', player: activePlayer})
    dispatch({type: 'incrementActions', player: activePlayer})
    dispatch({type: 'incrementBuys', player: activePlayer})
    dispatch({type: 'incrementGold', player: activePlayer})
    dispatch({type: 'incrementGold', player: activePlayer})

    lastEffectOutput = {callAgain: true}
    return lastEffectOutput;
}

let serializedEffects = serialize(festivalEffect, {})


export default class Festival extends Card {
    constructor(id) {
        super('Festival', id, 'action', 5);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedEffects]
    }
}
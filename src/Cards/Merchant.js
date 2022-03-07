import Card from './Card.js';
import full from '../Resources/Cards/merchant-full.jpg';
import half from '../Resources/Cards/merchant-half.jpg';
import { serialize } from './serialize.js';


function effects(dispatch, state, lastEffectOutput) { 
    let activePlayer = state.gameLoop.activePlayer
    dispatch({type: 'drawCard', player: activePlayer})
    dispatch({type: 'incrementActions'})

    dispatch({type: 'incrementMerchantEffect'})

    lastEffectOutput = {callAgain: true}
    return lastEffectOutput
}

let serializedEffects = serialize(effects, {})


export default class Merchant extends Card {
    constructor(id) {
        super('Merchant', id, 'action', 3);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedEffects]
    }
}
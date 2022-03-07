import Card from './Card.js';
import full from '../Resources/Cards/village-full.jpg';
import half from '../Resources/Cards/village-half.jpg';
import { serialize } from './serialize.js';


function effects(dispatch, state, lastEffectOutput) { 
    dispatch({type: 'incrementActions'})
    dispatch({type: 'incrementActions'})

    let activePlayer = state.gameLoop.activePlayer
    dispatch({type: 'drawCard', player: activePlayer})

    lastEffectOutput = {callAgain: true}
    return lastEffectOutput
}

let serializedEffects = serialize(effects, {})


export default class Village extends Card {
    constructor(id) {
        super('Village', id, 'action', 3);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedEffects]
    }
}
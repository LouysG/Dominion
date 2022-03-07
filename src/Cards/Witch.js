import Card from './Card.js';
import full from '../Resources/Cards/witch-full.jpg';
import half from '../Resources/Cards/witch-half.jpg';
import { serialize } from './serialize.js';


function effects(dispatch, state, lastEffectOutput) { 
    let activePlayer = state.gameLoop.activePlayer
    dispatch({type: 'drawCard', player: activePlayer})
    dispatch({type: 'drawCard', player: activePlayer})


    let card = state.baseCardTray.curseStack[0]
    dispatch({type: 'removeFromStack', stack: 'curseStack'})
    dispatch({type: 'addToDiscard', payload: card, player: 'player2'})
    card = state.baseCardTray.curseStack[1]
    dispatch({type: 'removeFromStack', stack: 'curseStack'})
    dispatch({type: 'addToDiscard', payload: card, player: 'player4'})
    
    lastEffectOutput = {callAgain: true}
    return lastEffectOutput
}

let serializedEffects = serialize(effects, {})

export default class Witch extends Card {
    constructor(id) {
        super('Witch', id, 'action-attack', 5);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedEffects]
    }
}
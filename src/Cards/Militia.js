import Card from './Card.js';
import full from '../Resources/Cards/militia-full.jpg';
import half from '../Resources/Cards/militia-half.jpg';
import { serialize } from './serialize.js';


function effects(dispatch, state, lastEffectOutput) {
    let activePlayer = state.gameLoop.activePlayer 
    dispatch({type: 'incrementGold', player: activePlayer})
    dispatch({type: 'incrementGold', player: activePlayer})

    let AI1Hand = state.playerTray.player2.hand
    let AI3Hand = state.playerTray.player4.hand
    if (AI1Hand[0]) {
        dispatch({type: 'removeFromHand', payload: AI1Hand[0], player: 'player2'})
        dispatch({type: 'addToDiscard', payload: AI1Hand[0], player: 'player2'})
    }
    if (AI1Hand[1]) {
        dispatch({type: 'removeFromHand', payload: AI1Hand[1], player: 'player2'})
        dispatch({type: 'addToDiscard', payload: AI1Hand[1], player: 'player2'})
    }
    if (AI3Hand[0]) {
        dispatch({type: 'removeFromHand', payload: AI3Hand[0], player: 'player4'})
        dispatch({type: 'addToDiscard', payload: AI3Hand[0], player: 'player4'})
    }
    if (AI3Hand[1]) {
        dispatch({type: 'removeFromHand', payload: AI3Hand[1], player: 'player4'})
        dispatch({type: 'addToDiscard', payload: AI3Hand[1], player: 'player4'})
    }



    lastEffectOutput = {callAgain: true}
    return lastEffectOutput
}

let serializedEffects = serialize(effects, {})


export default class Militia extends Card {
    constructor(id) {
        super('Militia', id, 'action-attack', 4);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedEffects]
    }
}
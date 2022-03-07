import Card from './Card.js';
import full from '../Resources/Cards/councilRoom-full.jpg';
import half from '../Resources/Cards/councilRoom-half.jpg';
import { serialize } from './serialize.js';

function councilRoomEffects(dispatch, state, lastEffectOutput) { 
    let activePlayer = state.gameLoop.activePlayer
    
    for (let i = 0; i < 4; i++) {
        dispatch({type: 'drawCard', player: activePlayer})
    }
    dispatch({type: 'incrementBuys', player: activePlayer})

    for (let i = 1; i < 5; i++) {
        if (activePlayer !== 'player' + i) {
            dispatch({type: 'drawCard', player: 'player' + i})
        }
    }
    lastEffectOutput = {callAgain: true}
    return lastEffectOutput;
}

let serializedEffects = serialize(councilRoomEffects, {})

export default class CouncilRoom extends Card {
    constructor(id) {
        super('Council Room', id, 'action', 5);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedEffects]
    }
}
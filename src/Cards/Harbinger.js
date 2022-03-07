import Card from './Card.js';
import full from '../Resources/Cards/harbinger-full.jpg';
import half from '../Resources/Cards/harbinger-half.jpg';
import { serialize } from './serialize.js';


function effects(dispatch, state, lastEffectOutput) { 
    let activePlayer = state.gameLoop.activePlayer
    dispatch({type: 'drawCard', player: activePlayer})
    dispatch({type: 'incrementActions'})

    let discard = state.playerTray[activePlayer].discard
    if (discard.length === 0) {
        lastEffectOutput = {callAgain: true}
        return lastEffectOutput
    }
    dispatch({type: 'setSelectorTrayVisibility', payload: true})
    dispatch({type: 'addArrayToSelectorTray', payload: discard})
    dispatch({type: 'setSelectionCriteria', 
        payload: {
            unselectEverything: false,
            location: ['selectorTray'],
            type: [],
            cost: [],
            name: ''
        }})
    dispatch({type: 'setOnSelect', payload: {
        action: 'putOnDeckHarbinger'
    }})
    

    lastEffectOutput = {callAgain: false}
    return lastEffectOutput
}

let serializedEffects = serialize(effects, {})


export default class Harbinger extends Card {
    constructor(id) {
        super('Harbinger', id, 'action', 3);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedEffects]
    }
}
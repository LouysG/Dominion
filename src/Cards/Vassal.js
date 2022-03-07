import Card from './Card.js';
import full from '../Resources/Cards/vassal-full.jpg';
import half from '../Resources/Cards/vassal-half.jpg';
import { serialize } from './serialize.js';


function incrementGold(dispatch, state, lastEffectOutput) {
    dispatch({type: 'incrementGold'})
    dispatch({type: 'incrementGold'})
    dispatch({type: 'setSelectionCriteria', 
        payload: {
            unselectEverything: true,
            location: [],
            type: [],
            cost: [],
            name: ''
        }})
    let card = state.playerTray.player1.deck[0]
    let discard = state.playerTray.player1.discard
    if (!card && discard.length) {
        dispatch({type: 'convertDiscardToDeck', player: 'player1'})
    } else if (!card && !discard.length) {
        lastEffectOutput = {callAgain: true, payload: 'skip'}
        return lastEffectOutput
    }

    lastEffectOutput = {callAgain: true}
    return lastEffectOutput
}

function effects(dispatch, state, lastEffectOutput) { 
    if (lastEffectOutput.payload === 'skip') {
        lastEffectOutput = {callAgain: true}
        return lastEffectOutput
    }
    
    
    let card = state.playerTray.player1.deck[0]
    dispatch({type: 'removeFromTop', player: 'player1'})
    dispatch({type: 'setSelectorTrayVisibility', payload: true})
    dispatch({type: 'addToSelectorTray', payload: card})
    if (card.type === 'action'
        || card.type === 'action-reaction'
        || card.type === 'action-attack') {
            dispatch ({type: 'setButton', button: 'button3', payload: {
                visible: true,
                text: 'Play',
                onSelect: 'vassalPlay'
            }})
            dispatch ({type: 'setButton', button: 'button2', payload: {
                visible: true,
                text: 'Discard',
                onSelect: 'vassalDiscard'
            }})
    } else {
        dispatch ({type: 'setButton', button: 'button1', payload: {
            visible: true,
            text: 'Discard',
            onSelect: 'vassalDiscard'
        }})
    }

    

    lastEffectOutput = {callAgain: false}
    return lastEffectOutput
}

let serializedGold = serialize(incrementGold, {})
let serializedEffects = serialize(effects, {})


export default class Vassal extends Card {
    constructor(id) {
        super('Vassal', id, 'action', 3);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedGold, serializedEffects]
    }
}
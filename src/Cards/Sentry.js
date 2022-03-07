import Card from './Card.js';
import full from '../Resources/Cards/sentry-full.jpg';
import half from '../Resources/Cards/sentry-half.jpg';
import { serialize } from './serialize.js';

function preEffects(dispatch, state, lastEffectOutput) { 
    let activePlayer = state.gameLoop.activePlayer
    dispatch({type: 'drawCard', player: activePlayer})
    dispatch({type: 'incrementActions'}) 

    lastEffectOutput = {callAgain: true}
    return lastEffectOutput
}

function effects(dispatch, state, lastEffectOutput) { 
    let top2 = state.playerTray.player1.deck.slice(0, 2)
    dispatch({type: 'addArrayToSelectorTray', payload: top2})

    let card = top2[1]
    dispatch({type: 'setSelectorTrayVisibility', payload: true})
    dispatch({type: 'setButton', button: 'button3', payload: {
        visible: true,
        text: 'Trash ' + card.name,
        onSelect: 'trashSentry2',
    }})
    dispatch({type: 'setButton', button: 'button1', payload: {
        visible: true,
        text: 'Discard ' + card.name,
        onSelect: 'discardSentry2',
    }})
    dispatch({type: 'setButton', button: 'button2', payload: {
        visible: true,
        text: 'Next Card',
        onSelect: 'passSentry2',
    }})

    lastEffectOutput = {callAgain: false}
    return lastEffectOutput
}

function postEffects(dispatch, state, lastEffectOutput) {
    let top2 = state.playArea.selectorTray
    if (top2.length < 2) {
        dispatch({type: 'setSelectorTrayVisibility', payload: false})
        dispatch({type: 'clearSelectorTray'})
        lastEffectOutput = {callAgain: true}
        return lastEffectOutput
    } 
    dispatch({type: 'setButton', button: 'button3', payload: {
        visible: true,
        text: 'Put ' + top2[0].name + ' On Top',
        onSelect: 'topSentrySame',
    }})
    dispatch({type: 'setButton', button: 'button2', payload: {
        visible: true,
        text: 'Put ' + top2[1].name + ' On Top',
        onSelect: 'topSentrySwitch',
    }})

    lastEffectOutput = {callAgain: false}
    return lastEffectOutput
}

let serializedEffects = serialize(effects, {})
let serializedPreEffects = serialize(preEffects, {})
let serializedPostEffects = serialize(postEffects, {})


export default class Sentry extends Card {
    constructor(id) {
        super('Sentry', id, 'action', 5);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedPreEffects, serializedEffects, serializedPostEffects]
    }
}
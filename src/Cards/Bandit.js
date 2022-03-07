import Card from './Card.js';
import full from '../Resources/Cards/bandit-full.jpg';
import half from '../Resources/Cards/bandit-half.jpg';
import { serialize } from './serialize.js';


function effects(dispatch, state, lastEffectOutput) { 
    if (state.baseCardTray.goldStack[0]) {
        let card = state.baseCardTray.goldStack[0]
        dispatch({type: 'removeFromStack', stack: 'goldStack'})
        dispatch({type: 'addToDiscard', player: 'player1', payload: card})
    }

    let player2Top2 = state.playerTray.player2.deck.slice(0, 2)
    dispatch({type: 'addArrayToSelectorTray', payload: player2Top2})

    let trashable = player2Top2.filter(card => {
        if (card.name === 'Gold'
            || card.name === 'Silver') {
                return true
            }
            return false
    })

    if (trashable[0]) {
        if (trashable[0].name === 'Silver' 
            || !trashable[1]) {
            dispatch({type: 'removeFromDeck', payload: trashable[0], player: 'player2'})
            dispatch({type: 'addToTrash', payload: trashable[0]})
        } else if (trashable[1]) {
            dispatch({type: 'removeFromDeck', payload: trashable[1], player: 'player2'})
            dispatch({type: 'addToTrash', payload: trashable[1]})
        }
    }

    dispatch({type: 'setSelectorTrayVisibility', payload: true})
    dispatch({type: 'setButton', button: 'button1', payload: {
        visible: true,
        text: 'Player 2 - OK',
        onSelect: 'banditP2Continue',
    }})

    lastEffectOutput = {callAgain: false}
    return lastEffectOutput
}

let serializedEffects = serialize(effects, {})



export default class Bandit extends Card {
    constructor(id) {
        super('Bandit', id, 'action-attack', 5);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedEffects]
    }
}
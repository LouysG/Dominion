import Card from './Card.js';
import full from '../Resources/Cards/library-full.jpg';
import half from '../Resources/Cards/library-half.jpg';
import { serialize } from './serialize.js';


function effects(dispatch, state, lastEffectOutput) { 
    let handLength = state.playerTray.player1.hand.length
    let toDraw = 7 - handLength

    if (toDraw < 1) {
        lastEffectOutput = {callAgain: true}
        return lastEffectOutput 
    }


    for (let i = 0; i < toDraw; i++) {
        dispatch({type: 'drawToSelectorTray', player: 'player1'})
    }

    dispatch({type: 'setSelectorTrayVisibility', payload: true})
    dispatch({type: 'setSelectionCriteria', 
                            payload: {
                                unselectEverything: false,
                                location: ['selectorTray'],
                                type: ['action', 'action-reaction', 'action-attack'],
                                cost: [],
                                name: ''
                            }})
                    
                        dispatch({type: 'setOnSelect', 
                            payload: {
                                action: 'setAsideLibrary',
                        }})
    dispatch ({type: 'setButton', button: 'button1', payload: {
        visible: true,
        text: 'Continue',
        onSelect: 'libraryContinue'
    }})

    lastEffectOutput = {callAgain: false}
    return lastEffectOutput
}

let serializedEffects = serialize(effects, {})


export default class Library extends Card {
    constructor(id) {
        super('Library', id, 'action', 5);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedEffects]
    }
}
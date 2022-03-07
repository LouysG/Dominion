import Card from './Card.js';
import full from '../Resources/Cards/cellar-full.jpg';
import half from '../Resources/Cards/cellar-half.jpg';
import { serialize } from './serialize.js';

function effects(dispatch, state, lastEffectOutput) {
    const activePlayer = state.gameLoop.activePlayer
   
    dispatch({type: 'incrementActions'})
    if (activePlayer === 'player1') {
        dispatch({type: 'setSelectionCriteria',
            payload: {
                unselectEverything: false,
                location: ['player1Hand'],
                type: [],
                cost: [],
                name: ''
            }
        })
        dispatch({type: 'setOnSelect',
            payload: {
                action: 'discardCellar'
            }
        })
        dispatch({type: 'setButton', button: 'button1', payload: {
            visible: true,
            text: 'Done',
            onSelect: 'cellarDraw'
        }})
        dispatch({type: 'setLastEffectOutput', payload: 0})
        lastEffectOutput = {callAgain: false}
        return lastEffectOutput 
    } else {
        dispatch({type: 'setOnSelect',
            payload: {
                action: 'doNothing'
            }
        })
        dispatch({type: 'callGetAction', payload: {
            update: true,
            action: 'cellar'
        }})
        lastEffectOutput = {callAgain: true}
        return lastEffectOutput 
    }
    
}


let serializedEffects = serialize(effects, {})

export default class Cellar extends Card {
    constructor(id) {
        super('Cellar', id, 'action', 2);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedEffects]
    }
}
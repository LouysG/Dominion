import Card from './Card.js';
import full from '../Resources/Cards/workshop-full.jpg';
import half from '../Resources/Cards/workshop-half.jpg';
import { serialize } from './serialize.js';


function effects(dispatch, state, lastEffectOutput) { 
    dispatch({type: 'setSelectionCriteria',
            payload: {
                unselectEverything: false,
                location: ['baseCardTray', 'kingdomCardTray'],
                type: [],
                cost: ['<', 5],
                name: ''
            }
        })
    if (state.gameLoop.activePlayer === 'player1') {
        dispatch({type: 'setOnSelect',
            payload: {
                action: 'discard'
            }
        })
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
            action: 'gain'
        }})
        lastEffectOutput = {callAgain: true}
        return lastEffectOutput 
    }
}



let serializedEffects = serialize(effects, {})




export default class Workshop extends Card {
    constructor(id) {
        super('Workshop', id, 'action', 3);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedEffects]
    }
}
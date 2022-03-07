import Card from './Card.js';
import full from '../Resources/Cards/poacher-full.jpg';
import half from '../Resources/Cards/poacher-half.jpg';
import { serialize } from './serialize.js';


function effects(dispatch, state, lastEffectOutput) { 
    let activePlayer = state.gameLoop.activePlayer
    dispatch({type: 'drawCard', player: activePlayer})
    dispatch({type: 'incrementActions'})
    dispatch({type: 'incrementGold', player: activePlayer})

    let stacks = [
        state.kingdomCardTray.kingdomStack1,
        state.kingdomCardTray.kingdomStack2,
        state.kingdomCardTray.kingdomStack3,
        state.kingdomCardTray.kingdomStack4,
        state.kingdomCardTray.kingdomStack5,
        state.kingdomCardTray.kingdomStack6,
        state.kingdomCardTray.kingdomStack7,
        state.kingdomCardTray.kingdomStack8,
        state.kingdomCardTray.kingdomStack9,
        state.kingdomCardTray.kingdomStack10,
        state.baseCardTray.copperStack,
        state.baseCardTray.silverStack,
        state.baseCardTray.goldStack,
        state.baseCardTray.estateStack,
        state.baseCardTray.duchyStack,
        state.baseCardTray.provinceStack,
        state.baseCardTray.curseStack,
    ]

    let emptyStacks = stacks.filter(stack => {
        if (stack.length === 0) {
            return true
        }
        return false
    })
    if (emptyStacks.length === 0 || state.playerTray[activePlayer].hand.length === 0) {
        lastEffectOutput = {callAgain: true}
        return lastEffectOutput
    }
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
                action: 'discardPoacher'
            }
        })



    lastEffectOutput = {callAgain: false, payload: emptyStacks.length}
    return lastEffectOutput
}

let serializedEffects = serialize(effects, {})


export default class Poacher extends Card {
    constructor(id) {
        super('Poacher', id, 'action', 4);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedEffects]
    }
}
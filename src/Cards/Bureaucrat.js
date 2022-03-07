import Card from './Card.js';
import full from '../Resources/Cards/bureaucrat-full.jpg';
import half from '../Resources/Cards/bureaucrat-half.jpg';
import { serialize } from './serialize.js';


function effects(dispatch, state, lastEffectOutput) { 
    let card = state.baseCardTray.silverStack[0]
    if (card) {
        dispatch({type: 'removeFromStack', stack: 'silverStack'})
        dispatch({type: 'addToTop', payload: card, player: 'player1'})
    }

    let player2VictoryInHand = state.playerTray.player2.hand.filter(card => {
        if (card.type === 'victory') {
            return true
        }
        return false
    })

    if (player2VictoryInHand.length > 0) {
        let card = player2VictoryInHand[0]
        dispatch({type: 'addToSelectorTray', payload: card})
        dispatch({type: 'removeFromHand', player: 'player2', payload: card})
        dispatch({type: 'addToTop', player: 'player2', payload: card})
    } else {
        dispatch({type: 'addArrayToSelectorTray', payload: state.playerTray.player2.hand})
    }
    
    // put on p2 deck
    dispatch({type: 'setSelectorTrayVisibility', payload: true})
    dispatch({type: 'setButton', button: 'button1', payload: {
        visible: true,
        text: 'Player 2 - OK',
        onSelect: 'bureaucratP2Continue',
    }})


 
    lastEffectOutput = {callAgain: false}
    return lastEffectOutput
}

let serializedEffects = serialize(effects, {})


export default class Bureaucrat extends Card {
    constructor(id) {
        super('Bureaucrat', id, 'action-attack', 4);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = [serializedEffects]
    }
}
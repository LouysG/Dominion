import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; 



function selectOnSelect (state) {
    if (state.onSelect !== undefined) {
        return state.onSelect
    }
    return state;
}

function selectLastEffectOutput (state) {
    if (state.theStack !== undefined) {
        return state.theStack.lastEffectOutput
    }
    return state;
}

function selectGameLoop (state) {
    if (state.gameLoop !== undefined) {
        return state.gameLoop
    }
    return state;
}

function selectTriggerEffects (state) {
    if (state.triggerEffects !== undefined) {
        return state.triggerEffects
    }
    return state;
}

function selectPlayerTray (state) {
    if (state.playerTray !== undefined) {
        return state.playerTray
    }
    return state;
}

function CardWrapper (props) {
    const dispatch = useDispatch();
    const card = props.card;
    const location = props.location;
    const selectable = props.selectable;
    const onSelect = useSelector(selectOnSelect);
    const lastEffectOutput = useSelector(selectLastEffectOutput)
    const gameLoop = useSelector(selectGameLoop)
    const triggerEffects = useSelector(selectTriggerEffects)
    const playerTray = useSelector(selectPlayerTray)
    const player1 = playerTray.player1

    // Figure out which image size to use
    let image;
    if (props.imageSize === 'full') {
        image = card.fullImage;
    } else if (props.imageSize === 'half') {
        image = card.halfImage;
    }

    // Figure out whether or not to use a stack counter
    let stackCount;
    if (props.stackCount) {
        stackCount = (
            <p id='stackCount'>{props.stackCount}</p>
        )
    }

    // If the card is selectable, add a border
    let divStyle;
    if (selectable === true) {
        divStyle = {
            backgroundImage: `url(${image})`,
            boxShadow: '.3em .3em .4em gold, -.3em -.3em .4em gold, .3em -.3em .4em gold, -.3em .3em .4em gold',
        }
    } else if (selectable === false) {
        divStyle = {
            backgroundImage: `url(${image})`
        }
    }

    // Build the onClick handler from the onSelect slice of state
    function handleClick () {
        if (!selectable) {
            return
        }
        if (onSelect.action === 'doNothing') {

        } else {
            removeFromLocation(location);
        }
        if (onSelect.action === 'play') {
            dispatch({type: 'addToPlayArea', payload: card})
            dispatch({type: 'addCardToTheStack', payload: card})
            dispatch({type: 'decrementActions'})
            dispatch({type: 'setActionSubphase', payload: 'resolveEffects'})
            dispatch({type: 'updateGameState', payload: true})
        }
        if (onSelect.action === 'playTreasure') {
            dispatch({type: 'addToPlayArea', payload: card})
            if (triggerEffects.merchant) {
                dispatch({type: 'setGold', operator: '+', payload: triggerEffects.merchant})
                dispatch({type: 'clearTriggerEffects'})
            }
            dispatch({type: 'setGold', operator: '+', payload: card.effects})
            dispatch({type: 'updateGameState', payload: true})
        }
        if (onSelect.action === 'buy') {
            dispatch({type: 'addToDiscard', payload: card, player: 'player1'})
            dispatch({type: 'decrementBuys'})
            dispatch({type: 'setGold', payload: card.cost, operator: '-'})
            dispatch({type: 'updateGameState', payload: true})
        }
        if (onSelect.action === 'discard') {
            dispatch({type: 'addToDiscard', payload: card, player: 'player1'})
            dispatch({type: 'updateGameState', payload: true})
        }
        if (onSelect.action === 'trash') {
            dispatch({type: 'addToTrash', payload: card})
        }
        if (onSelect.action === 'putOnDeck') {
            dispatch({type: 'addToTop', payload: card, player: 'player1'})
            dispatch({type: 'updateGameState', payload: true})
        }
        if (onSelect.action === 'gainToHand') {
            dispatch({type: 'addToHand', payload: card, player: 'player1'});
            dispatch({type: 'updateGameState', payload: true})
        }


        // Card Specific Effects
        if (onSelect.action === 'trashRemodel') {
            dispatch({type: 'addToTrash', payload: card})
            dispatch({type: 'setLastEffectOutput', payload: {
                trashedCardCost: card.cost
            }})
            dispatch({type: 'updateGameState', payload: true})
        }
        if (onSelect.action === 'trashMine') {
            dispatch({type: 'addToTrash', payload: card})
            dispatch({type: 'setLastEffectOutput', payload: {
                trashedCardCost: card.cost
            }})
            dispatch({type: 'updateGameState', payload: true})
        }
        if (onSelect.action === 'discardCellar') {
            dispatch({type: 'addToDiscard', payload: card, player: 'player1'})
            dispatch({type: 'setLastEffectOutput', specialAction: 'increment'})
        }
        if (onSelect.action === 'trashMoneylender') {
            dispatch({type: 'addToTrash', payload: card})
            dispatch({type: 'incrementGold'})
            dispatch({type: 'incrementGold'})
            dispatch({type: 'incrementGold'})
            dispatch({type: 'updateGameState', payload: true})
        }
        if (onSelect.action === 'putOnDeckHarbinger') {
            dispatch({type: 'addToTop', payload: card, player: 'player1'})
            dispatch({type: 'removeFromDiscard', payload: card, player: 'player1'})
            dispatch({type: 'setSelectorTrayVisibility', payload: false})
            dispatch({type: 'clearSelectorTray'})
            dispatch({type: 'updateGameState', payload: true})
        }
        if (onSelect.action === 'trashChapel') {
            dispatch({type: 'addToTrash', payload: card})
            dispatch({type: 'setLastEffectOutput', specialAction: 'increment'})
            if (lastEffectOutput === 3) {
                dispatch({type: 'pass', 
                    actionSubphase: gameLoop.actionSubphase,
                    buySubphase: gameLoop.buySubphase, 
                    turnPhase: gameLoop.turnPhase})
            }
        }
        if (onSelect.action === 'discardPoacher') {
            dispatch({type: 'addToDiscard', payload: card, player: 'player1'})
            dispatch({type: 'setLastEffectOutput', specialAction: 'decrement'})
            if (lastEffectOutput.payload === 1) {
                dispatch({type: 'updateGameState', payload: true})
            }
        }
        if (onSelect.action === 'playThroneRoom') {
            dispatch({type: 'addToPlayArea', payload: card})
            dispatch({type: 'addCardToTheStack', payload: card})
            dispatch({type: 'addCardToTheStack', payload: card})
            dispatch({type: 'setActionSubphase', payload: 'resolveEffects'})
            dispatch({type: 'updateGameState', payload: true})
        }
        if (onSelect.action === 'setAsideLibrary') {
            dispatch({type: 'addToSetAsideTray', payload: card})
            let toDraw = player1.deck[0]
            if (toDraw) {
                dispatch({type: 'removeFromTop', player: 'player1'})
                dispatch({type: 'addToSelectorTray', payload: toDraw})
            }
        }
    }

    // helper function for handle click, uses props to create removeFrom actions
    function removeFromLocation (location) {
        if (location === 'player1Hand') {
            dispatch({type: 'removeFromHand', payload: card, player: 'player1'})
        }
        if (location === 'selectorTray') {
            dispatch({type: 'removeFromSelectorTray', payload: card})
        }
        if (location.slice(0, 12) === 'kingdomStack') {
            dispatch({type: 'removeFromStack', stack: location})
        }
        // for the baseCardTray
        if (location.slice(-5) === 'Stack') {
            dispatch({type: 'removeFromStack', stack: location})
        }
    }


    return (
        <div id={props.id}
            style={divStyle}
            onClick={handleClick}>
            {stackCount}
        </div>
    )
}

export default CardWrapper;
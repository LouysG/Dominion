import React from "react";
import '../../../CSS/PlayArea.css';
import { useSelector, useDispatch } from 'react-redux';
import goldIcon from '../../../Resources/gold-icon.png';
import buyIcon from '../../../Resources/buy-icon.png';
import actionIcon from '../../../Resources/action-icon.png';
import leftArrow from '../../../Resources/left-arrow.png';
import rightArrow from '../../../Resources/right-arrow.png';
import CardWrapper from "../../CardWrapper.js";



function selectPlayArea (state) {
    if (state.playArea !== undefined) {
        return state.playArea;
    }
    return state;
}

function selectSelectionCriteria (state) {
    if (state.selectionCriteria !== undefined) {
        return state.selectionCriteria;
    }
    return state;
}

function selectGameLoop (state) {
    if (state.gameLoop !== undefined) {
        return state.gameLoop;
    }
    return state;
}

function selectTheStack (state) {
    if (state.theStack !== undefined) {
        return state.theStack;
    }
    return state;
}

function selectPlayerTray (state) {
    if (state.playerTray !== undefined) {
        return state.playerTray;
    }
    return state;
}

function PlayArea (props) {
    const dispatch = useDispatch();
    const playArea = useSelector(selectPlayArea);
    const selectionCriteria = useSelector(selectSelectionCriteria);
    const gameLoop = useSelector(selectGameLoop)
    const turnPhase = gameLoop.turnPhase
    const actionSubphase = gameLoop.actionSubphase
    const buySubphase = gameLoop.buySubphase
    const canPass = gameLoop.canPass;
    const optionalButtons = playArea.optionalButtons
    const actions = playArea.actions;
    const buys = playArea.buys;
    const gold = playArea.gold;
    const inPlay = playArea.inPlay;
    const inPlaySegment = playArea.inPlaySegment;
    const selectorTrayIsVisible = playArea.selectorTrayIsVisible;
    const selectorTraySegment = playArea.selectorTraySegment;
    const selectorTray = playArea.selectorTray;
    const theStack = useSelector(selectTheStack)
    const setAsideTray = playArea.setAsideTray
    const playerTray = useSelector(selectPlayerTray)
    let message = playArea.selectorMessage;

    let visibleCards = [];
    let visibleCardsSelectorTray = [];
    let passButton = [];
    let buttons = [];


    function scrollLeft (state) {
        if (inPlaySegment > 0) {
            dispatch({type: 'decrementInPlaySegment'});
        }
    }
    
    function scrollRight (state) {
        let segments = Math.ceil(inPlay.length / 20);
        if (inPlaySegment + 1 < segments) {
            dispatch({type: 'incrementInPlaySegment'});
        }
    }

    function scrollLeftSelectorTray (state) {
        if (selectorTraySegment > 0) {
            dispatch({type: 'decrementSelectorTraySegment'});
        }
    }
    
    function scrollRightSelectorTray (state) {
        let segments = Math.ceil(selectorTray.length / 5);
        if (selectorTraySegment + 1 < segments) {
            dispatch({type: 'incrementSelectorTraySegment'});
        }
    }

    function pass () {
        dispatch({type: 'pass', 
        actionSubphase: gameLoop.actionSubphase,
        buySubphase: gameLoop.buySubphase, 
        turnPhase: gameLoop.turnPhase})
    }

    function isSelectable (card, criteria) {
        let locationMatches = true;
        let typeMatches = true;
        let costMatches = true;
        let nameMatches = true;
        
        if (criteria.unselectEverything === true) {
            return false;
        }
        if (criteria.location[0]) {
            if (!criteria.location.includes('selectorTray')) {
                locationMatches = false;
            }
        }
        if (criteria.type[0]) {
            if (!criteria.type.includes(card.type)) {
                typeMatches = false;
            }
        }
        if (criteria.cost[0]) {
            if (criteria.cost[0] === '<') {
                if (card.cost >= criteria.cost[1]) {
                    costMatches = false;
                }
            }
            if (criteria.cost[0] === '>') {
                if (card.cost <= criteria.cost[1]) {
                    costMatches = false;
                }
            }
            if (criteria.cost[0] === '=') {
                if (card.cost !== criteria.cost[1]) {
                    costMatches = false;
                }
            }
        }
        if (criteria.name) {
            if (card.name !== criteria.name) {
                nameMatches = false;
            }
        }
        if (locationMatches && typeMatches && costMatches && nameMatches) {
            return true;
        }
        return false;
    }

    // Generates components for visible cards in playArea
    for (let i = 1; i < 21; i++) {
        if (inPlay[i - 1 + (20 * inPlaySegment)]) {
            visibleCards.push(
                <CardWrapper id={'inPlayCard' + i}
                    card={inPlay[i - 1 + (20 * inPlaySegment)]}
                    zIndex={i}
                    selectable={false}
                    style={{
                        filter: 'none',
                        opacity: '100%'
                    }} 
                    imageSize='full'
                    location='playArea'>
                </CardWrapper>
            ) 
        } else {
            visibleCards.push(null);
        }
    }

    // Generates components for visible cards in selectorTray
    for (let i = 1; i < 6; i++) {
        if (selectorTray[i - 1 + (5 * selectorTraySegment)]) {
            let selectable = isSelectable(selectorTray[i - 1 + (5 * selectorTraySegment)], selectionCriteria)
            visibleCardsSelectorTray.push(
                <CardWrapper id={'selectorTrayCard' + i}
                    card={selectorTray[i - 1 + (5 * selectorTraySegment)]}
                    zIndex={i}
                    selectable={selectable} 
                    imageSize='full'
                    location='selectorTray'>
                </CardWrapper>
            ) 
        } else {
            visibleCardsSelectorTray.push(null);
        }
    }

    // Generates Pass Button
    if (canPass) {
        passButton = (
            <div id='passButton' style={{color: 'gold'}} onClick={pass}>
                    <div id='passText'>Pass</div>
            </div>
        )
    } else {
        passButton = (
            <div id='passButton' style={{color: 'grey'}}>
                    <div id='passText'>Pass</div>
            </div>
        )
    }

    // Generates Game State Monitor
    let turnPhaseText;
    let subphaseText;
    if (turnPhase === 'action') {
        turnPhaseText = 'ACTION'
        if (actionSubphase === 'playActions') {
            subphaseText = 'Play Actions'
        } else if (actionSubphase === 'resolveEffects') {
            subphaseText = 'Resolve Effects'
        }
    } else if (turnPhase === 'buy') {
        turnPhaseText = 'BUY'
        if (buySubphase === 'playTreasure') {
            subphaseText = 'Play Treasure'
        } else if (buySubphase === 'buyCards') {
            subphaseText = 'Buy Cards'
        }
    }
    const gameStateMonitor = (
        <div id='gameStateMonitor'> 
            <p id='turnPhaseText'>{turnPhaseText}</p>
            <p id='subphaseText'>{subphaseText}</p>
        </div>
    )

    // Generates Hand Scroll Counter
    let currentSegment = playerTray.player1.handSegment + 1
    let totalSegments = Math.ceil(playerTray.player1.hand.length / 5)
    let handScrollCounter = (
        <div id='handScrollCounter'> 
            <p id= 'handScrollText'>{currentSegment + ' / ' + totalSegments}</p>
        </div>
    )


    // Builds the onClick Handler for optional buttons
    const handler1 = optionalButtons.button1.onSelect
    const handler2 = optionalButtons.button2.onSelect
    const handler3 = optionalButtons.button3.onSelect

    function handleButtonClick(handler) {
        if (handler === 'cellarDraw') {
            let toDraw = theStack.lastEffectOutput
            for (let i = 0; i < toDraw; i++) {
                dispatch({type: 'drawCard', player: 'player1'})
            } 
            dispatch({type: 'updateGameState', payload: true})
            dispatch({type: 'clearOptionalButtons'})
        }
        if (handler === 'vassalPlay') {
            let card = selectorTray[0]
            dispatch({type: 'clearSelectorTray'})
            dispatch({type: 'addToPlayArea', payload: card})
            dispatch({type: 'addCardToTheStack', payload: card})
            dispatch({type: 'setActionSubphase', payload: 'resolveEffects'})
            dispatch({type: 'updateGameState', payload: true})
            dispatch({type: 'clearOptionalButtons'})
            dispatch({type: 'setSelectorTrayVisibility', payload: false})
        }
        if (handler === 'vassalDiscard') {
            let card = selectorTray[0]
            dispatch({type: 'clearSelectorTray'})
            dispatch({type: 'addToDiscard', payload: card, player: 'player1'})
            dispatch({type: 'updateGameState', payload: true})
            dispatch({type: 'clearOptionalButtons'})
            dispatch({type: 'setSelectorTrayVisibility', payload: false})
        }
        if (handler === 'libraryContinue') {
            dispatch({type: 'addArrayToHand', player: 'player1', payload: selectorTray})
            dispatch({type: 'clearSelectorTray'})
            dispatch({type: 'addArrayToDiscard', player: 'player1', payload: setAsideTray})
            dispatch({type: 'clearSetAsideTray'})
            dispatch({type: 'updateGameState', payload: true})
            dispatch({type: 'clearOptionalButtons'})
            dispatch({type: 'setSelectorTrayVisibility', payload: false})
        }
        if (handler === 'bureaucratP2Continue') {
            let player4VictoryInHand = playerTray.player4.hand.filter(card => {
                if (card.type === 'victory') {
                    return true
                }
                return false
            })
            dispatch({type: 'clearSelectorTray'})
            if (player4VictoryInHand.length > 0) {
                let card = player4VictoryInHand[0]
                dispatch({type: 'addToSelectorTray', payload: card})
                dispatch({type: 'removeFromHand', player: 'player4', payload: card})
                dispatch({type: 'addToTop', player: 'player4', payload: card})
            } else {
                dispatch({type: 'addArrayToSelectorTray', payload: playerTray.player4.hand})
            }
            dispatch({type: 'setSelectorTrayVisibility', payload: true})
            dispatch({type: 'setButton', button: 'button1', payload: {
                visible: true,
                text: 'Player 3 - OK',
                onSelect: 'bureaucratP4Continue',
            }})
        }
        if (handler === 'bureaucratP4Continue') {
            dispatch({type: 'clearSelectorTray'})
            dispatch({type: 'updateGameState', payload: true})
            dispatch({type: 'clearOptionalButtons'})
            dispatch({type: 'setSelectorTrayVisibility', payload: false})
        }
        if (handler === 'banditP2Continue') {
            dispatch({type: 'clearSelectorTray'})
            let player4Top2 = playerTray.player4.deck.slice(0, 2)
            dispatch({type: 'addArrayToSelectorTray', payload: player4Top2})

            let trashable = player4Top2.filter(card => {
                if (card.name === 'Gold'
                    || card.name === 'Silver') {
                        return true
                    }
                    return false
            })

            if (trashable[0]) {
                if (trashable[0].name === 'Silver' 
                    || !trashable[1]) {
                    dispatch({type: 'removeFromDeck', payload: trashable[0], player: 'player4'})
                    dispatch({type: 'addToTrash', payload: trashable[0]})
                } else if (trashable[1]) {
                    dispatch({type: 'removeFromDeck', payload: trashable[1], player: 'player4'})
                    dispatch({type: 'addToTrash', payload: trashable[1]})
                }
            }
        
            dispatch({type: 'setSelectorTrayVisibility', payload: true})
            dispatch({type: 'setButton', button: 'button1', payload: {
                visible: true,
                text: 'Player 3 - OK',
                onSelect: 'banditP4Continue',
            }})

        }
        if (handler === 'banditP4Continue') {
            dispatch({type: 'clearSelectorTray'})
            dispatch({type: 'updateGameState', payload: true})
            dispatch({type: 'clearOptionalButtons'})
            dispatch({type: 'setSelectorTrayVisibility', payload: false})
        }
        if (handler === 'trashSentry1') {
            let card = playerTray.player1.deck[0]
            dispatch({type: 'removeFromSelectorTray', payload: card})
            dispatch({type: 'removeFromDeck', payload: card, player: 'player1'})
            dispatch({type: 'addToTrash', payload: card})
            dispatch({type: 'updateGameState', payload: true})
            dispatch({type: 'clearOptionalButtons'})
        }
        if (handler === 'discardSentry1') {
            let card = playerTray.player1.deck[0]
            dispatch({type: 'removeFromSelectorTray', payload: card})
            dispatch({type: 'removeFromDeck', payload: card, player: 'player1'})
            dispatch({type: 'addToDiscard', payload: card, player: 'player1'})
            dispatch({type: 'updateGameState', payload: true})
            dispatch({type: 'clearOptionalButtons'})
        }
        if (handler === 'passSentry1') {
            dispatch({type: 'updateGameState', payload: true})
            dispatch({type: 'clearOptionalButtons'})
        }
        if (handler === 'trashSentry2') {
            let card = playerTray.player1.deck[1]
            dispatch({type: 'removeFromSelectorTray', payload: card})
            dispatch({type: 'removeFromDeck', payload: card, player: 'player1'})
            dispatch({type: 'addToTrash', payload: card})

            let nextCard = playerTray.player1.deck[0]
            dispatch({type: 'setButton', button: 'button3', payload: {
                visible: true,
                text: 'Trash ' + nextCard.name,
                onSelect: 'trashSentry1',
            }})
            dispatch({type: 'setButton', button: 'button1', payload: {
                visible: true,
                text: 'Discard ' + nextCard.name,
                onSelect: 'discardSentry1',
            }})
            dispatch({type: 'setButton', button: 'button2', payload: {
                visible: true,
                text: 'Pass',
                onSelect: 'passSentry1',
            }})
        }
        if (handler === 'discardSentry2') {
            let card = playerTray.player1.deck[1]
            dispatch({type: 'removeFromSelectorTray', payload: card})
            dispatch({type: 'removeFromDeck', payload: card, player: 'player1'})
            dispatch({type: 'addToDiscard', payload: card, player: 'player1'})

            let nextCard = playerTray.player1.deck[0]
            dispatch({type: 'setButton', button: 'button3', payload: {
                visible: true,
                text: 'Trash ' + nextCard.name,
                onSelect: 'trashSentry1',
            }})
            dispatch({type: 'setButton', button: 'button1', payload: {
                visible: true,
                text: 'Discard ' + nextCard.name,
                onSelect: 'discardSentry1',
            }})
            dispatch({type: 'setButton', button: 'button2', payload: {
                visible: true,
                text: 'Pass',
                onSelect: 'passSentry1',
            }})
        }
        if (handler === 'passSentry2') {
            let nextCard = playerTray.player1.deck[0]
            dispatch({type: 'setButton', button: 'button3', payload: {
                visible: true,
                text: 'Trash ' + nextCard.name,
                onSelect: 'trashSentry1',
            }})
            dispatch({type: 'setButton', button: 'button1', payload: {
                visible: true,
                text: 'Discard ' + nextCard.name,
                onSelect: 'discardSentry1',
            }})
            dispatch({type: 'setButton', button: 'button2', payload: {
                visible: true,
                text: 'Pass',
                onSelect: 'passSentry1',
            }})
        }
        if (handler === 'topSentrySame') {
            dispatch({type: 'clearSelectorTray'})
            dispatch({type: 'setSelectorTrayVisibility', payload: false})
            dispatch({type: 'updateGameState', payload: true})
            dispatch({type: 'clearOptionalButtons'})
        }
        if (handler === 'topSentrySwitch') {
            let card = playerTray.player1.deck[1]
            dispatch({type: 'removeFromDeck', payload: card, player: 'player1'})
            dispatch({type: 'addToTop', payload: card, player: 'player1'})
            dispatch({type: 'clearSelectorTray'})
            dispatch({type: 'setSelectorTrayVisibility', payload: false})
            dispatch({type: 'updateGameState', payload: true})
            dispatch({type: 'clearOptionalButtons'})
        }
        if (handler === 'stopViewingTrash') {
            dispatch({type: 'setCanPass', payload: true})
            dispatch({type: 'clearSelectorTray'})
            dispatch({type: 'setSelectorTrayVisibility', payload: false})
            dispatch({type: 'clearOptionalButtons'})
        }

    }

    function handleButton1Click() {
        handleButtonClick(handler1)
    }

    function handleButton2Click() {
        handleButtonClick(handler2)
    }

    function handleButton3Click() {
        handleButtonClick(handler3)
    }

    // Generates Optional Buttons
    if (optionalButtons.button1.visible === true) {
        buttons.push(
            <div id='button1' onClick={handleButton1Click}>
                <div id='buttonText'>{optionalButtons.button1.text}</div>
            </div>
        )
    }
    if (optionalButtons.button2.visible === true) {
        buttons.push(
            <div id='button2' onClick={handleButton2Click}>
                <div id='buttonText'>{optionalButtons.button2.text}</div>
            </div>
        )
    }
    if (optionalButtons.button3.visible === true) {
        buttons.push(
            <div id='button3' onClick={handleButton3Click}>
                <div id='buttonText'>{optionalButtons.button3.text}</div>
            </div>
        )
    }

    //Display arrows if neccesary
    let leftArrowImage;
    let rightArrowImage
    if ((inPlay.length > 20 && selectorTrayIsVisible === false)
        || (selectorTray.length > 5 && selectorTrayIsVisible === true)) {
        leftArrowImage = (
            <img id={'playAreaLeftArrow'} src={leftArrow}></img>
        )
        rightArrowImage = (
            <img id={'playAreaRightArrow'} src={rightArrow}></img>
        )
    }

    let content;
    if (selectorTrayIsVisible) {
        content = (
            <div id='playArea'>
                <div id='selectorTray'>
                <div id='resourceTray'>
                <div id='actions'>
                        <div id='actionIcon' style={{backgroundImage: `url(${actionIcon})`}}></div>
                        <div className='resourceCount'>{actions}</div>
                    </div>
                    <div id='buys'>
                        <div id='buyIcon' style={{backgroundImage: `url(${buyIcon})`}}></div>
                        <div className='resourceCount'>{buys}</div>
                    </div>   
                    <div id='gold'>
                        <div id='goldIcon' style={{backgroundImage: `url(${goldIcon})`}}></div>
                        <div className='resourceCount'>{gold}</div>
                    </div>
                </div>
                    <div id='message'>{message}</div>
                    <div id='leftArrowSelectorTray' onClick={scrollLeftSelectorTray}>
                        {leftArrowImage}
                    </div>
                    {visibleCardsSelectorTray} 
                    <div id='rightArrowSelectorTray' onClick={scrollRightSelectorTray}>
                        {rightArrowImage}
                    </div>
                    {buttons}
                    {passButton}
                    {gameStateMonitor}
                    {handScrollCounter}
                </div>
            </div>
        )
    } else {
        content = (
            <div id='playArea'>
                <div id='leftArrowInPlay' onClick={scrollLeft}>
                    {leftArrowImage}
                </div>
                <div id='resourceTray'>
                    <div id='actions'>
                        <div id='actionIcon' style={{backgroundImage: `url(${actionIcon})`}}></div>
                        <div className='resourceCount'>{actions}</div>
                    </div>
                    <div id='buys'>
                        <div id='buyIcon' style={{backgroundImage: `url(${buyIcon})`}}></div>
                        <div className='resourceCount'>{buys}</div>
                    </div>   
                    <div id='gold'>
                        <div id='goldIcon' style={{backgroundImage: `url(${goldIcon})`}}></div>
                        <div className='resourceCount'>{gold}</div>
                    </div>
                </div>
                {visibleCards}
                <div id='rightArrowInPlay' onClick={scrollRight}>
                    {rightArrowImage}
                </div>
                {buttons}
                {passButton}
                {gameStateMonitor}
                {handScrollCounter}
            </div>
        )
    }

    return (
        [content]
    )
}

export default PlayArea;
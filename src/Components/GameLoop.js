import { useDispatch, useSelector } from 'react-redux';
import Board from './Board/Board.js';
import cards from '../Cards/allCards.js';
import { parse } from '../Cards/serialize.js'
import getAction1 from '../AI/AI1.js';
import getAction3 from '../AI/AI3.js'


function selectState (state) {
    return state;
}




function GameLoop (props) {
    const dispatch = useDispatch();
    const state = useSelector(selectState);
    const gameLoop = state.gameLoop;

    const gamePhase = gameLoop.gamePhase;
    const turnPhase = gameLoop.turnPhase;
    const activePlayer = gameLoop.activePlayer;
    const buySubphase = gameLoop.buySubphase;
    const actionSubphase = gameLoop.actionSubphase;
    const updateGameState  = gameLoop.updateGameState;
    const theStack = state.theStack;
    const playerTray = state.playerTray;
    const lastEffectOutput = theStack.lastEffectOutput

    function getAction(type, dispatch, state) {
        if (activePlayer === 'player2') {
            getAction1(type, dispatch, state)
        } else if (activePlayer === 'player4') {
            getAction3(type, dispatch, state)
        }
    }



    /*
    incrementStack() is durring the resolveEffects actionSubphase. resolveEffects expects a
    boolean value indicating whether or not it should call incrementStack again.

    If an effect is resolved, return effectOutput.callAgain 
        (effectOutput dictates if another call is necessary)
    If a card is converted to effects, return true.
        (Call increment stack again and resolve the first effect)
    If the stack is empty, return false.
        (Let the game proceed to the next phase)
    */
    function incrementStack() {
        if (theStack.effects.length > 0) {
            let effectToResolve = parse(theStack.effects[0])
            dispatch({type: 'removeEffectFromTheStack'})
            let effectOutput = resolveEffect(effectToResolve)
            dispatch({type: 'setLastEffectOutput', payload: effectOutput})
            return effectOutput.callAgain;
        } else if (theStack.cards.length > 0) {
            let currentCard = theStack.cards[0]
            dispatch({type: 'removeCardFromTheStack', payload: currentCard})
            for (let i = 0; i < currentCard.effects.length; i++) {
                dispatch({type: 'addEffectToTheStack', payload: currentCard.effects[i]})
            }
            return true;
        } else if (theStack.cards.length === 0 && theStack.effects.length === 0) {
            dispatch({type: 'setActionSubphase', payload: 'playActions'})
            if (state.playArea.actions <= 0) { 
                dispatch({type: 'setTurnPhase', payload: 'buy'})
            }
            return true;
        }
    }

    function resolveEffect (effect) {
        return effect(dispatch, state, lastEffectOutput)
    }




    function performGameStateActions () {
        if (!updateGameState) {
            return
        }

        // Updates Victory Points
        for (let i = 1; i < 5; i++) {
            let player = 'player' + i
            let victoryDeck = playerTray[player].deck.filter(card => {
                if (card.type === 'victory' || card.type === 'curse') {
                    return true;
                } 
                return false;
            })
            let victoryHand = playerTray[player].hand.filter(card => {
                if (card.type === 'victory' || card.type === 'curse') {
                    return true
                }
                return false
            })
            let victoryDiscard = playerTray[player].discard.filter(card => {
                if (card.type === 'victory' || card.type === 'curse') {
                    return true
                }
                return false
            })
            let victoryCards = victoryDeck.concat(victoryHand).concat(victoryDiscard)
            let points = 0
            for (let i = 0; i < victoryCards.length; i++) {
                if (victoryCards[i].name === 'Estate') {
                    points += 1
                }
                if (victoryCards[i].name === 'Duchy') {
                    points += 3
                }
                if (victoryCards[i].name === 'Province') {
                    points += 6
                }
                if (victoryCards[i].name === 'Curse') {
                    points -= 1
                }
                if (victoryCards[i].name === 'Gardens') {
                    let cards = playerTray[player].deck.length + playerTray[player].hand.length + playerTray[player].discard.length
                    if (player === activePlayer) {
                        cards += state.playArea.inPlay.length
                    }
                    points += Math.floor(cards/10)
                }
            }
            dispatch({type: 'setPoints', payload: points, player: player})
        }



        /* ---DISCLOSURE---
        Displays a disclosure giving credit to the games creators, disavows commercial
        intent and encourages users to buy the real thing.
        */
        if (gamePhase === 'disclosure') {

        }



        /* ---SET UP---
        Sets the game to initial state. Selects which kingdom cards will be available 
        this game. Shuffles players' decks and draws their starting hands.
        */
        else if (gamePhase === 'setUp') {
            let allKingdomCards = cards[2];
            let kingdomCards = [];
            while (kingdomCards.length < 10) {
                let card = allKingdomCards[Math.floor(Math.random() * allKingdomCards.length)]
                if (!kingdomCards.includes(card)) {
                    kingdomCards.push(card);
                }
            }
            dispatch({type: 'initialize', payload: kingdomCards});
            dispatch({type: 'drawNewDeck', player: 'player1'})
            dispatch({type: 'drawNewDeck', player: 'player2'})
            //dispatch({type: 'drawNewDeck', player: 'player3'})
            dispatch({type: 'drawNewDeck', player: 'player4'})
            dispatch({type: 'shuffle', player: 'player1'});
            dispatch({type: 'shuffle', player: 'player2'});
            //dispatch({type: 'shuffle', player: 'player3'});
            dispatch({type: 'shuffle', player: 'player4'});
            dispatch({type: 'drawHand', player: 'player1'});
            dispatch({type: 'drawHand', player: 'player2'});
            //dispatch({type: 'drawHand', player: 'player3'});
            dispatch({type: 'drawHand', player: 'player4'});
            dispatch({type: 'setGamePhase', payload: 'play'});
            return
        }



        /* ---PLAY---
        The majority of the game occurs in the play phase. Control is passed from player
        to player until a win condition is met.
        */
        else if (gamePhase === 'play') {
            


            /* ---ACTION---
            The active player plays actions
            */
            if (turnPhase === 'action') {
                


                /* ---PLAY ACTIONS---
                The action subphase in which the player selects actions to play from hand
                */
                if (actionSubphase === 'playActions') {
                    if (state.playArea.actions < 1) {
                        dispatch({type: 'setTurnPhase', payload: 'buy'})
                        return
                    }
                    if (activePlayer === 'player1') {
                        dispatch({type: 'setSelectionCriteria', 
                            payload: {
                                unselectEverything: false,
                                location: ['player1Hand'],
                                type: ['action', 'action-reaction', 'action-attack'],
                                cost: [],
                                name: ''
                            }})
                    
                        dispatch({type: 'setOnSelect', 
                            payload: {
                                action: 'play',
                        }})
                        dispatch({type: 'setCanPass', payload: true})

                        let actions = state.playerTray[activePlayer].hand.filter(card => {
                            if (card.type === 'action' || card.type === 'action-reaction' || card.type === 'action-attack') {
                                return true
                            } else {
                                return false;
                            }
                        })
                        
                        if (actions.length < 1) {
                            dispatch({type: 'setTurnPhase', payload: 'buy'})
                            return
                        }
                    } else {
                        getAction('playActions', dispatch, state)
                        return
                    }  
    
                

                /* ---RESOLVE EFFECTS---
                When a player plays an action effects are placed on the stack, and then 
                resolved
                */
                } else if (actionSubphase === 'resolveEffects') {
                    dispatch({type: 'setSelectionCriteria', 
                            payload: {
                                unselectEverything: true,
                                location: [],
                                type: [],
                                cost: [],
                                name: ''
                            }})
                    dispatch({type: 'setCanPass', payload: false})
                    // resolve effects on stack
                    if (state.callGetAction.update) {
                        getAction(state.callGetAction.action, dispatch, state)
                    }
                    let callAgain = incrementStack()
                    if (callAgain) {
                        return 
                    }
                }



            }



            /* ---BUY---
            The active player buys cards
            */
            else if (turnPhase === 'buy') {
                if (state.playArea.buys < 1) {
                    dispatch({type: 'setBuySubphase', payload: 'playTreasure'})
                    dispatch({type: 'setTurnPhase', payload: 'cleanUp'})
                    return
                }

                

                    /* ---PLAY TREASURE---
                    The active player plays treasure cards
                    */
                    if (buySubphase === 'playTreasure') {
                        // If no treasure in his hand, go to buyCards subphase
                        let treasure = state.playerTray[activePlayer].hand.filter(card => {
                            if (card.type === 'treasure') {
                                return true
                            } else {
                                return false;
                            }
                        })
                        if (treasure.length < 1) {
                            dispatch({type: 'setBuySubphase', payload: 'buyCards'})
                            return
                        }

                        if (activePlayer === 'player1') {
                            dispatch({type: 'setCanPass', payload: true})
                            dispatch({type: 'setSelectionCriteria', 
                                payload: {
                                    unselectEverything: false,
                                    location: ['player1Hand'],
                                    type: ['treasure'],
                                    cost: [],
                                    name: ''
                                }})
                            dispatch({type: 'setOnSelect', 
                                payload: {
                                    action: 'playTreasure',
                            }})

                            
                        } else {
                            getAction('playTreasure', dispatch, state)
                            return
                        }

                        



                    /* ---BUY CARDS---
                    The active player buys cards
                    */
                    } else if (buySubphase === 'buyCards') {
                        if (activePlayer === 'player1') {
                            dispatch({type: 'setCanPass', payload: true})
                            dispatch({type: 'setSelectionCriteria', 
                                payload: {
                                    unselectEverything: false,
                                    location: ['baseCardTray', 'kingdomCardTray'],
                                    type: [],
                                    cost: ['<', state.playArea.gold + 1],
                                    name: ''
                                }})
                            dispatch({type: 'setOnSelect', 
                                payload: {
                                    action: 'buy',
                            }})

                            if (state.playArea.gold < 0) {
                                dispatch({type: 'setBuySubphase', payload: 'playTreasure'})
                                dispatch({type: 'setTurnPhase', payload: 'cleanUp'})
                                return
                            }
                        } else {
                            getAction('buyCards', dispatch, state)
                            return
                        }
                    }



            }



            /* ---CLEAN UP---
            Discards the active player's hand and draws a new hand. Resets actions, buys,
            and gold. Checks for win conditions. 
            */
            else if (turnPhase === 'cleanUp') {
                dispatch({type: 'setCanPass', payload: false})
                dispatch({type: 'clearTriggerEffects'})
                dispatch({type: 'setSelectionCriteria', 
                            payload: {
                                unselectEverything: true,
                                location: [],
                                type: [],
                                cost: [],
                                name: ''
                            }})
                dispatch({type: 'addArrayToDiscard', payload: state.playArea.inPlay, player: activePlayer})
                dispatch({type: 'clearPlayArea'})
                dispatch({type: 'discardHand', player: activePlayer})
                dispatch({type: 'drawHand', player: activePlayer})
                dispatch({type: 'resetResources'})

                let endGame = false;
                if (state.baseCardTray.provinceStack.length === 0) {
                    endGame = true;
                }
                
                let emptyBaseCardStacks = 0;
                let emptyKingdomCardStacks = 0;

                let baseCards = ['copper', 'silver', 'gold', 'estate', 'duchy', 'province', 'curse']
                for (let i = 0; i < 7; i++) {
                    let stack = baseCards[i] + 'Stack'
                    if (state.baseCardTray[stack].length === 0) {
                        emptyBaseCardStacks++;
                    }
                }

                for (let i = 1; i < 11; i++) {
                    let stack = 'kingdomStack' + i;
                    if (state.kingdomCardTray[stack].length === 0) {
                        emptyKingdomCardStacks++;
                    }
                }
                
                if (emptyBaseCardStacks + emptyKingdomCardStacks >= 3) {
                    endGame = true;
                }

                if (endGame) {
                    dispatch({type: 'setGamePhase', payload: 'endGame'})
                    return
                }
                console.log(activePlayer + '\'s turn ended')
                dispatch({type: 'incrementActivePlayer'})
                dispatch({type: 'setTurnPhase', payload: 'action'})
                return
            }
        }



        /* ---END GAME---
        Displays a victory or defeat screen.
        */
        else if (gamePhase === 'endGame') {
            let winner;
            const player1 = playerTray.player1
            const player2 = playerTray.player2
            const player3 = playerTray.player4
            if (player1.victoryPoints > player2.victoryPoints
                && player1.victoryPoints > player3.victoryPoints) {
                    winner = player1.name
            } else if (player2.victoryPoints > player1.victoryPoints
                && player2.victoryPoints > player3.victoryPoints) {
                    winner = player2.name
            } else if (player3.victoryPoints > player2.victoryPoints
                && player3.victoryPoints > player1.victoryPoints) {
                    winner = player3.name
            } else {
                winner = 'No One'
            }
        
            dispatch({type: 'displayVictoryScreen', payload: {
                victoryScreenIsVisible: true,
                winner: winner
            }})
        } 



        dispatch({type: 'updateGameState', payload: false})
    }

    performGameStateActions()


    return (
        <Board/>
    )
}

export default GameLoop;


/*
READ ME
READ ME
READ ME


This code does not work and I am genuinely unable to figure out why. Sometimes the 
AI will break the whole program with a too many re-renders error. I am unable to replicate
this error consistently. Further, while the AI dispatches many actions it will often throw
the error after rerendering very few times. For the time being, I'm not going to use this
AI.
*/









// A3: uses an Engine strategy. Wins by building an 'engine' deck that consistently
// draws the majority of its cards and delivers a payload each turn for high value


export default function getAction (type, dispatch, state) {
    const gameLoop = state.gameLoop
    const player3 = state.playerTray.player3
    const hand  = player3.hand
    const deck = player3.deck
    const discard = player3.discard
    const inPlay = state.playArea.inPlay
    const gold = state.playArea.gold
    const actions = state.playArea.actions
    const allCards = hand.concat(deck).concat(discard).concat(inPlay)



    // Counts silver in deck
    let silver = allCards.filter(card => {
        if (card.name === 'Silver') {
            return true;
        } 
        return false;
    }).length

    // Counts gold cards in deck
    let goldInDeck = allCards.filter(card => {
        if (card.name === 'Gold') {
            return true;
        } 
        return false;
    }).length

   // Counts "actionBoosters" in deck
   let actionBoosters = allCards.filter(card => {
        if (card.name === 'Village'
        || card.name === 'Festival'
        || card.name === 'Laboratory'
        || card.name === 'Market') {
            return true;
        } 
        return false;
    }).length

    // Count "draw cards"  in deck
    let draws = allCards.filter(card => {
        if (card.name === 'Smithy'
        || card.name === 'Council Room'
        || card.name === 'Laboratory'
        || card.name === 'Moat'
        || card.name === 'Witch') {
            return true;
        } 
        return false;
    }).length

    // Count "payloads" in deck
    let payloads = allCards.filter(card => {
        if (card.name === 'Witch'
        || card.name === 'Festival'
        || card.name === 'Market') {
            return true;
        } 
        return false;
    }).length

    // Count "sifters" in deck
    let sifters = allCards.filter(card => {
        if (card.name === 'Cellar') {
            return true;
        } 
        return false;
    }).length

    // Generates an array of available kingdom cards and the stacks they reside in
    let kingdomCards = []
    let kingdomCardTray = state.kingdomCardTray
    for (let i = 1; i < 11; i++) {
        let stack = 'kingdomStack' + i
        let name  = null
        if (kingdomCardTray[stack][0]) {
            name = kingdomCardTray[stack][0].name
        }
        kingdomCards.push({
            stack: stack,
            name: name
        })
    }







    if (type === 'playActions') {
        let villageInHand = hand.filter(card => {
            if (card.name === 'Village') {
                return true
            }
            return false
        })
        let festivalInHand = hand.filter(card => {
            if (card.name === 'Festival') {
                return true
            }
            return false
        })
        let laboratoryInHand = hand.filter(card => {
            if (card.name === 'Laboratory') {
                return true
            }
            return false
        })
        let marketInHand = hand.filter(card => {
            if (card.name === 'Market') {
                return true
            }
            return false
        })
        let smithyInHand = hand.filter(card => {
            if (card.name === 'Smithy') {
                return true
            }
            return false
        })
        let councilRoomInHand = hand.filter(card => {
            if (card.name === 'Council Room') {
                return true
            }
            return false
        })
        let witchInHand = hand.filter(card => {
            if (card.name === 'Witch') {
                return true
            }
            return false
        })
        let moatInHand = hand.filter(card => {
            if (card.name === 'Moat') {
                return true
            }
            return false
        })
        let cellarInHand = hand.filter(card => {
            if (card.name === 'Cellar') {
                return true
            }
            return false
        })

        function playAction (card) {
            dispatch({type: 'removeFromHand', payload: card, player: 'player3'})
            dispatch({type: 'addToPlayArea', payload: card})
            dispatch({type: 'addCardToTheStack', payload: card})
            dispatch({type: 'decrementActions'})
            dispatch({type: 'setActionSubphase', payload: 'resolveEffects'})
            dispatch({type: 'updateGameState', payload: true})
        }


        if (villageInHand.length > 0) {
            let card = villageInHand[0]
            console.log('AI2 played ' + card.name)
            playAction(card)
            /*
        } else if (laboratoryInHand.length > 0)  {
            let card = laboratoryInHand[0]
            console.log('AI2 played ' + card.name)
            playAction(card)
        } else if (marketInHand.length > 0)  {
            let card = marketInHand[0]
            console.log('AI2 played ' + card.name)
            playAction(card)
        } else if (festivalInHand.length > 0)  {
            let card = festivalInHand[0]
            console.log('AI2 played ' + card.name)
            playAction(card)
        } else if (actions > 1) {
            if (cellarInHand.length > 0) {
                let card = cellarInHand[0]
                console.log('AI2 played ' + card.name)
                playAction(card)
            } else if (smithyInHand.length > 0)  {
                let card = smithyInHand[0]
                console.log('AI2 played ' + card.name)
                playAction(card)
            } else if (councilRoomInHand.length > 0)  {
                let card = councilRoomInHand[0]
                console.log('AI2 played ' + card.name)
                playAction(card)
            } else if (moatInHand.length > 0)  {
                let card = moatInHand[0]
                console.log('AI2 played ' + card.name)
                playAction(card)
            }

        } else if (actions === 0) {
            if (witchInHand.length > 0) {
                let card = witchInHand[0]
                console.log('AI2 played ' + card.name)
                playAction(card)
            } else if (smithyInHand.length > 0)  {
                let card = smithyInHand[0]
                console.log('AI2 played ' + card.name)
                playAction(card)
            } else if (councilRoomInHand.length > 0)  {
                let card = councilRoomInHand[0]
                console.log('AI2 played ' + card.name)
                playAction(card)
            } else if (cellarInHand.length > 0) {
                let card = cellarInHand[0]
                console.log('AI2 played ' + card.name)
                playAction(card)
            } else if (moatInHand.length > 0)  {
                let card = moatInHand[0]
                console.log('AI2 played ' + card.name)
                playAction(card)
            } 
            */
        } else {
            dispatch({type: 'pass',
            actionSubphase: gameLoop.actionSubphase,
            buySubphase: gameLoop.buySubphase, 
            turnPhase: gameLoop.turnPhase})
            return
        }
    }



    if (type === 'playTreasure') {
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].type === 'treasure') {
                console.log('AI2 played ' + hand[i].name)
                dispatch({type: 'addToPlayArea', payload: hand[i]})
                dispatch({type: 'removeFromHand', payload: hand[i], player: 'player3'})
                dispatch({type: 'setGold', operator: '+', payload: hand[i].effects})
                dispatch({type: 'updateGameState', payload: true})
                return
            }
        }
    }



    if (type === 'buyCards') {
        function buyCard (card, stack) {
            console.log('AI2 bought ' + card.name)
            dispatch({type: 'removeFromStack', stack: stack})
            dispatch({type: 'addToDiscard', payload: card, player: 'player3'})
            dispatch({type: 'decrementBuys'})
            dispatch({type: 'setGold', payload: card.cost, operator: '-'})
            dispatch({type: 'updateGameState', payload: true})
        }


        if (silver < 2 && gold >= 3) {
            if (state.baseCardTray.silverStack[0]) {
                let card = state.baseCardTray.silverStack[0]
                let stack = 'silverStack'
                buyCard(card, stack)
                return
            }
        }

        if (payloads < 2) {
            let witchAvailable = false
            let festivalAvailable = false
            let marketAvailable = false
            let witchStack = ''
            let festivalStack = ''
            let marketStack = ''
            kingdomCards.forEach(card =>  {
                if (card.name === 'Witch') {
                    witchAvailable = true
                    witchStack = card.stack
                }
                if (card.name === 'Festival') {
                    festivalAvailable = true
                    festivalStack = card.stack
                }
                if (card.name === 'Market') {
                    marketAvailable = true
                    marketStack = card.stack
                }
            })
            if (witchAvailable) {
                if (gold >= 5) {
                    if (state.kingdomCardTray[witchStack][0]) {
                        let card = state.kingdomCardTray[witchStack][0]
                        buyCard(card, witchStack)
                        return
                    }
                }
            }
            if (festivalAvailable) {
                if (gold >= 5) {
                    if (state.kingdomCardTray[festivalStack][0]) {
                        let card = state.kingdomCardTray[festivalStack][0]
                        buyCard(card, festivalStack)
                        return
                    }
                }
            }
            if (marketAvailable) {
                if (gold >= 5) {
                    if (state.kingdomCardTray[marketStack][0]) {
                        let card = state.kingdomCardTray[marketStack][0]
                        buyCard(card, marketStack)
                        return
                    }
                }
            }
        }

        if (sifters < 2) {
            let cellarAvailable = false
            let stack = ''
            kingdomCards.forEach(card =>  {
                if (card.name === 'Cellar') {
                    cellarAvailable = true
                    stack = card.stack
                }
            })
            if (cellarAvailable) {
                if (state.kingdomCardTray[stack][0]) {
                    let card = state.kingdomCardTray[stack][0]
                    buyCard(card, stack)
                    return
                }
            }
        }

        if (actionBoosters < 5) {
            let villageAvailable = false
            let festivalAvailable = false
            let marketAvailable = false
            let laboratoryAvailable = false
            let villageStack = ''
            let festivalStack = ''
            let marketStack = ''
            let laboratoryStack = ''
            kingdomCards.forEach(card =>  {
                if (card.name === 'Village') {
                    villageAvailable = true
                    villageStack = card.stack
                }
                if (card.name === 'Festival') {
                    festivalAvailable = true
                    festivalStack = card.stack
                }
                if (card.name === 'Market') {
                    marketAvailable = true
                    marketStack = card.stack
                }
                if (card.name === 'Laboratory') {
                    laboratoryAvailable = true
                    laboratoryStack = card.stack
                }
            })
            if (villageAvailable) {
                if (gold >= 3) {
                    if (state.kingdomCardTray[villageStack][0]) {
                        let card = state.kingdomCardTray[villageStack][0]
                        buyCard(card, villageStack)
                        return
                    }
                }
            }
            if (laboratoryAvailable) {
                if (gold >= 5) {
                    if (state.kingdomCardTray[laboratoryStack][0]) {
                        let card = state.kingdomCardTray[laboratoryStack][0]
                        buyCard(card, laboratoryStack)
                        return
                    }
                }
            }
            if (festivalAvailable) {
                if (gold >= 5) {
                    if (state.kingdomCardTray[festivalStack][0]) {
                        let card = state.kingdomCardTray[festivalStack][0]
                        buyCard(card, festivalStack)
                        return
                    }
                }
            }
            if (marketAvailable) {
                if (gold >= 5) {
                    if (state.kingdomCardTray[marketStack][0]) {
                        let card = state.kingdomCardTray[marketStack][0]
                        buyCard(card, marketStack)
                        return
                    }
                }
            }
        }

        if (draws < 2) {
            let smithyAvailable = false
            let councilRoomAvailable = false
            let laboratoryAvailable = false
            let witchAvailable = false
            let moatAvailable = false
            let smithyStack = ''
            let councilRoomStack = ''
            let laboratoryStack = ''
            let witchStack = ''
            let moatStack = ''
            kingdomCards.forEach(card =>  {
                if (card.name === 'Smithy') {
                    smithyAvailable = true
                    smithyStack = card.stack
                }
                if (card.name === 'Council Room') {
                    councilRoomAvailable = true
                    councilRoomStack = card.stack
                }
                if (card.name === 'Moat') {
                    moatAvailable = true
                    moatStack = card.stack
                }
                if (card.name === 'Witch') {
                    witchAvailable = true
                    witchStack = card.stack
                }
                if (card.name === 'Laboratory') {
                    laboratoryAvailable = true
                    laboratoryStack = card.stack
                }
            })
            if (smithyAvailable) {
                if (gold >= 4) {
                    if (state.kingdomCardTray[smithyStack][0]) {
                        let card = state.kingdomCardTray[smithyStack][0]
                        buyCard(card, smithyStack)
                        return
                    }
                }
            }
            if (councilRoomAvailable) {
                if (gold >= 5) {
                    if (state.kingdomCardTray[councilRoomStack][0]) {
                        let card = state.kingdomCardTray[councilRoomStack][0]
                        buyCard(card, councilRoomStack)
                        return
                    }
                }
            }
            if (laboratoryAvailable) {
                if (gold >= 5) {
                    if (state.kingdomCardTray[laboratoryStack][0]) {
                        let card = state.kingdomCardTray[laboratoryStack][0]
                        buyCard(card, laboratoryStack)
                        return
                    }
                }
            }
            if (witchAvailable) {
                if (gold >= 5) {
                    if (state.kingdomCardTray[witchStack][0]) {
                        let card = state.kingdomCardTray[witchStack][0]
                        buyCard(card, witchStack)
                        return
                    }
                }
            }
            if (moatAvailable) {
                if (gold >= 2) {
                    if (state.kingdomCardTray[moatStack][0]) {
                        let card = state.kingdomCardTray[moatStack][0]
                        buyCard(card, moatStack)
                        return
                    }
                }
            }
        }

        if (payloads < 4) {
            let witchAvailable = false
            let festivalAvailable = false
            let marketAvailable = false
            let witchStack = ''
            let festivalStack = ''
            let marketStack = ''
            kingdomCards.forEach(card =>  {
                if (card.name === 'Witch') {
                    witchAvailable = true
                    witchStack = card.stack
                }
                if (card.name === 'Festival') {
                    festivalAvailable = true
                    festivalStack = card.stack
                }
                if (card.name === 'Market') {
                    marketAvailable = true
                    marketStack = card.stack
                }
            })
            if (witchAvailable) {
                if (gold >= 5) {
                    if (state.kingdomCardTray[witchStack][0]) {
                        let card = state.kingdomCardTray[witchStack][0]
                        buyCard(card, witchStack)
                        return
                    }
                }
            }
            if (festivalAvailable) {
                if (gold >= 5) {
                    if (state.kingdomCardTray[festivalStack][0]) {
                        let card = state.kingdomCardTray[festivalStack][0]
                        buyCard(card, festivalStack)
                        return
                    }
                }
            }
            if (marketAvailable) {
                if (gold >= 5) {
                    if (state.kingdomCardTray[marketStack][0]) {
                        let card = state.kingdomCardTray[marketStack][0]
                        buyCard(card, marketStack)
                        return
                    }
                }
            }
        }

        if (actionBoosters < 10) {
            let villageAvailable = false
            let festivalAvailable = false
            let marketAvailable = false
            let laboratoryAvailable = false
            let villageStack = ''
            let festivalStack = ''
            let marketStack = ''
            let laboratoryStack = ''
            kingdomCards.forEach(card =>  {
                if (card.name === 'Village') {
                    villageAvailable = true
                    villageStack = card.stack
                }
                if (card.name === 'Festival') {
                    festivalAvailable = true
                    festivalStack = card.stack
                }
                if (card.name === 'Market') {
                    marketAvailable = true
                    marketStack = card.stack
                }
                if (card.name === 'Laboratory') {
                    laboratoryAvailable = true
                    laboratoryStack = card.stack
                }
            })
            if (villageAvailable) {
                if (gold >= 3) {
                    if (state.kingdomCardTray[villageStack][0]) {
                        let card = state.kingdomCardTray[villageStack][0]
                        buyCard(card, villageStack)
                        return
                    }
                }
            }
            if (laboratoryAvailable) {
                if (gold >= 5) {
                    if (state.kingdomCardTray[laboratoryStack][0]) {
                        let card = state.kingdomCardTray[laboratoryStack][0]
                        buyCard(card, laboratoryStack)
                        return
                    }
                }
            }
            if (festivalAvailable) {
                if (gold >= 5) {
                    if (state.kingdomCardTray[festivalStack][0]) {
                        let card = state.kingdomCardTray[festivalStack][0]
                        buyCard(card, festivalStack)
                        return
                    }
                }
            }
            if (marketAvailable) {
                if (gold >= 5) {
                    if (state.kingdomCardTray[marketStack][0]) {
                        let card = state.kingdomCardTray[marketStack][0]
                        buyCard(card, marketStack)
                        return
                    }
                }
            }
        }

        if (draws < 4) {
            let smithyAvailable = false
            let councilRoomAvailable = false
            let laboratoryAvailable = false
            let witchAvailable = false
            let moatAvailable = false
            let smithyStack = ''
            let councilRoomStack = ''
            let laboratoryStack = ''
            let witchStack = ''
            let moatStack = ''
            kingdomCards.forEach(card =>  {
                if (card.name === 'Smithy') {
                    smithyAvailable = true
                    smithyStack = card.stack
                }
                if (card.name === 'Council Room') {
                    councilRoomAvailable = true
                    councilRoomStack = card.stack
                }
                if (card.name === 'Moat') {
                    moatAvailable = true
                    moatStack = card.stack
                }
                if (card.name === 'Witch') {
                    witchAvailable = true
                    witchStack = card.stack
                }
                if (card.name === 'Laboratory') {
                    laboratoryAvailable = true
                    laboratoryStack = card.stack
                }
            })
            if (smithyAvailable) {
                if (gold >= 4) {
                    if (state.kingdomCardTray[smithyStack][0]) {
                        let card = state.kingdomCardTray[smithyStack][0]
                        buyCard(card, smithyStack)
                        return
                    }
                }
            }
            if (councilRoomAvailable) {
                if (gold >= 5) {
                    if (state.kingdomCardTray[councilRoomStack][0]) {
                        let card = state.kingdomCardTray[councilRoomStack][0]
                        buyCard(card, councilRoomStack)
                        return
                    }
                }
            }
            if (laboratoryAvailable) {
                if (gold >= 5) {
                    if (state.kingdomCardTray[laboratoryStack][0]) {
                        let card = state.kingdomCardTray[laboratoryStack][0]
                        buyCard(card, laboratoryStack)
                        return
                    }
                }
            }
            if (witchAvailable) {
                if (gold >= 5) {
                    if (state.kingdomCardTray[witchStack][0]) {
                        let card = state.kingdomCardTray[witchStack][0]
                        buyCard(card, witchStack)
                        return
                    }
                }
            }
            if (moatAvailable) {
                if (gold >= 2) {
                    if (state.kingdomCardTray[moatStack][0]) {
                        let card = state.kingdomCardTray[moatStack][0]
                        buyCard(card, moatStack)
                        return
                    }
                }
            }
        }
        if (goldInDeck < 2 && gold >= 6) {
            if (state.baseCardTray.goldStack[0]) {
                let card = state.baseCardTray.goldStack[0]
                let stack = 'goldStack'
                buyCard(card, stack)
                return
            }
        }
        if (gold >= 8) {
            if (state.baseCardTray.provinceStack[0]) {
                let card = state.baseCardTray.provinceStack[0]
                let stack = 'provinceStack'
                buyCard(card, stack)
                return
            }
        }
        if (gold >= 5) {
            if (state.baseCardTray.duchyStack[0]) {
                let card = state.baseCardTray.duchyStack[0]
                let stack = 'duchyStack'
                buyCard(card, stack)
                return
            }
        }
        dispatch({type: 'pass',
        actionSubphase: gameLoop.actionSubphase,
        buySubphase: gameLoop.buySubphase, 
        turnPhase: gameLoop.turnPhase})
        return
    }

    if (type === 'discard') {
        let priority = [
            'Curse', 
            'Estate',
            'Duchy',
            'Province',
            'Cellar',
            'Moat',
            'Market',
            'Village',
            'Smithy',
            'Laboratory',
            'Festival',
            'CouncilRoom',
            'Witch',
            'Copper',
            'Silver',
            'Gold'
            ]
    
        for (let i = 0; i < priority.length; i++) {
            for (let j = 0; j < hand.length; j++) {
                if (priority[i] === hand[j].name) {
                    let card = hand[j]
                    console.log('AI2 discarded ' + card.name)
                    dispatch({type: 'addToDiscard', payload: card, player: 'player4'})
                    dispatch({type: 'updateGameState', payload: true})
                    return
                }
            }
        }
    }




    if (type === 'cellar') {
        let toDiscard = hand.filter(card => {
            if (card.type === 'curse' || card.type === 'victory') {
                return true
            }
            return false
        })
        for (let card of toDiscard) {
            dispatch({type: 'removeFromHand', payload: card, player: 'player3'})
            dispatch({type: 'addToDiscard', payload: card, player: 'player3'})
        }
        for (let i = 0; i < toDiscard.length; i++) {
            dispatch({type: 'drawCard', player: 'player3'})
        }
    }
}
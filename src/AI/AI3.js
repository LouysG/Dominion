



// A3: uses a Slog strategy. Wins by consistently buying 1-2 mid-level victory point
// cards a turn while everyone else fights over provinces.

export default function getAction3 (type, dispatch, state) {
    const gameLoop = state.gameLoop
    const player4 = state.playerTray.player4
    const hand  = player4.hand
    const deck = player4.deck
    const discard = player4.discard
    const inPlay = state.playArea.inPlay
    const gold = state.playArea.gold
    const allCards = hand.concat(deck).concat(discard).concat(inPlay)

    // Counts silver in deck
    let silver = allCards.filter(card => {
        if (card.name === 'Silver') {
            return true;
        } 
        return false;
    }).length

   // Counts "gainers" in deck
   let gainers = allCards.filter(card => {
        if (card.name === 'Workshop'
        || card.name === 'Artisan') {
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
        let workshopInHand = hand.filter(card => {
            if (card.name === 'Workshop') {
                return true
            }
            return false
        })
        let artisanInHand = hand.filter(card => {
            if (card.name === 'Artisan') {
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
            console.log('AI3 played ' + card)
            dispatch({type: 'removeFromHand', payload: card, player: 'player4'})
            dispatch({type: 'addToPlayArea', payload: card})
            dispatch({type: 'addCardToTheStack', payload: card})
            dispatch({type: 'decrementActions'})
            dispatch({type: 'setActionSubphase', payload: 'resolveEffects'})
            dispatch({type: 'updateGameState', payload: true})
        }


        if (artisanInHand.length > 0) {
            let card = artisanInHand[0]
            playAction(card)
        } else if (workshopInHand.length > 0) {
            let card = workshopInHand[0]
            playAction(card) 
        } else if (cellarInHand.length > 0) {
            let card = cellarInHand[0]
            playAction(card) 
        } else {
            dispatch({type: 'pass',
            actionSubphase: gameLoop.actionSubphase,
            buySubphase: gameLoop.buySubphase, 
            turnPhase: gameLoop.turnPhase})
        }
        return
    }




    if (type === 'playTreasure') {
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].type === 'treasure') {
                console.log('AI3 played ' + hand[i].name)
                dispatch({type: 'addToPlayArea', payload: hand[i]})
                dispatch({type: 'removeFromHand', payload: hand[i], player: 'player4'})
                dispatch({type: 'setGold', operator: '+', payload: hand[i].effects})
                dispatch({type: 'updateGameState', payload: true})
                return
            }
        }
    }





    if (type === 'buyCards') {
        function buyCard (card, stack) {
            console.log('AI3 bought ' + card.name)
            dispatch({type: 'removeFromStack', stack: stack})
            dispatch({type: 'addToDiscard', payload: card, player: 'player4'})
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
        if (gold >= 8) {
            if (state.baseCardTray.provinceStack[0]) {
                let card = state.baseCardTray.provinceStack[0]
                let stack = 'provinceStack'
                buyCard(card, stack)
                return
            }
        }
        if (gold >= 4) {
            let gardensAvailable = false
            let stack = ''
            kingdomCards.forEach(card =>  {
                if (card.name === 'Gardens') {
                    gardensAvailable = true
                    stack = card.stack
                }
            })
            if (gardensAvailable) {
                if (state.kingdomCardTray[stack][0]) {
                    let card = state.kingdomCardTray[stack][0]
                    buyCard(card, stack)
                    return
                }
            }
        }
        if (gainers < 4) {
            let artisanAvailable = false
            let workshopAvailable = false
            let artisanStack = ''
            let workshopStack = ''

            kingdomCards.forEach(card =>  {
                if (card.name === 'Artisan') {
                    artisanAvailable = true
                    artisanStack = card.stack
                }
                if (card.name === 'Workshop') {
                    workshopAvailable = true
                    workshopStack = card.stack
                }
            })
            if (artisanAvailable) {
                if (gold >= 6) {
                    if (state.kingdomCardTray[artisanStack][0]) {
                        let card = state.kingdomCardTray[artisanStack][0]
                        buyCard(card, artisanStack)
                        return
                    }
                }
            }
            if (workshopAvailable) {
                if (gold >= 3) {
                    if (state.kingdomCardTray[workshopStack][0]) {
                        let card = state.kingdomCardTray[workshopStack][0]
                        buyCard(card, workshopStack)
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
                if (gold >= 2) {
                    if (state.kingdomCardTray[stack][0]) {
                        let card = state.kingdomCardTray[stack][0]
                        buyCard(card, stack)
                        return
                    }
                }
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
        if (gold >= 3) {
            if (state.baseCardTray.silverStack[0]) {
                let card = state.baseCardTray.silverStack[0]
                let stack = 'silverStack'
                buyCard(card, stack)
                return
            }
        }
        if (gold >= 2) {
            if (state.baseCardTray.estateStack[0]) {
                let card = state.baseCardTray.estateStack[0]
                let stack = 'estateStack'
                buyCard(card, stack)
                return
            }
        }
        if (state.baseCardTray.copperStack[0]) {
            let card = state.baseCardTray.copperStack[0]
            let stack = 'copperStack'
            buyCard(card, stack)
            return
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
            'Gardens',
            'Cellar',
            'Workshop',
            'Artisan',
            'Copper',
            'Silver'
            ]
    
            for (let i = 0; i < priority.length; i++) {
                for (let j = 0; j < hand.length; j++) {
                    if (priority[i] === hand[j].name) {
                        let card = hand[j]
                        console.log('AI3 discarded ' + card.name)
                        dispatch({type: 'addToDiscard', payload: card, player: 'player4'})
                        dispatch({type: 'updateGameState', payload: true})
                        return
                    }
                }
            }
    }




    if (type === 'trash') {

    }





    if (type === 'gain' || type === 'gainToHand') {
        function isSelectable (cardCost) {
            let criteria = state.selectionCriteria;
            let costMatches = true;

            if (criteria.unselectEverything === true) {
                return false;
            }
            if (criteria.cost[0]) {
                if (criteria.cost[0] === '<') {
                    if (cardCost >= criteria.cost[1]) {
                        costMatches = false;
                    }
                }
                if (criteria.cost[0] === '>') {
                    if (cardCost <= criteria.cost[1]) {
                        costMatches = false;
                    }
                }
                if (criteria.cost[0] === '=') {
                    if (cardCost !== criteria.cost[1]) {
                        costMatches = false;
                    }
                }
            }
            if (costMatches) {
                return true;
            }
            return false;
        }

        function gainCard (card, stack) {
            console.log('AI3 gained ' + card.name)
            dispatch({type: 'removeFromStack', stack: stack})
            if (type === 'gain') {
                dispatch({type: 'addToDiscard', payload: card, player: 'player4'})
            } else if (type === 'gainToHand') {
                dispatch({type: 'addToHand', payload: card, player: 'player4'})
            }
            dispatch({type: 'updateGameState', payload: true})
            dispatch({type: 'callGetAction', payload: {
                update: false,
                action: ''
            }})
        }

        if (isSelectable(4)) {
            let gardensAvailable = false
            let stack = ''
            kingdomCards.forEach(card =>  {
                if (card.name === 'Gardens') {
                    gardensAvailable = true
                    stack = card.stack
                }
            })
            if (gardensAvailable) {
                if (state.kingdomCardTray[stack][0]) {
                    let card = state.kingdomCardTray[stack][0]
                    gainCard(card, stack)
                    return
                }
            }
        }
        if (isSelectable(5)) {
            if (state.baseCardTray.duchyStack[0]) {
                let card = state.baseCardTray.duchyStack[0]
                gainCard(card, 'duchyStack')
                return
            }
        }
        if (isSelectable(3)) {
            if (state.baseCardTray.silverStack[0]) {
                let card = state.baseCardTray.silverStack[0]
                let stack = 'silverStack'
                gainCard(card, stack)
                return
            }
        }
        if (isSelectable(2)) {
            if (state.baseCardTray.estateStack[0]) {
                let card = state.baseCardTray.estateStack[0]
                let stack = 'estateStack'
                gainCard(card, stack)
                return
            }
        }
        if (isSelectable(0)) {
            if (state.baseCardTray.copperStack[0]) {
                let card = state.baseCardTray.copperStack[0]
                let stack = 'copperStack'
                gainCard(card, stack)
                return
            }
        }
    }




    if (type === 'addToTop') {
        let card = hand[0]
        console.log('AI3 added ' + card.name + ' to the top of its deck')
        dispatch({type: 'removeFromHand', payload: card, player: 'player4'})
        dispatch({type: 'addToTop', payload: card, player: 'player4'})
        dispatch({type: 'updateGameState', payload: true})
        dispatch({type: 'callGetAction', payload: {
            update: false,
            action: ''
        }})
    }




    if (type === 'cellar') {
        let toDiscard = hand.filter(card => {
            if (card.type === 'curse' || card.type === 'victory') {
                return true
            }
            return false
        })
        for (let card of toDiscard) {
            dispatch({type: 'removeFromHand', payload: card, player: 'player4'})
            dispatch({type: 'addToDiscard', payload: card, player: 'player4'})
        }
        for (let i = 0; i < toDiscard.length; i++) {
            dispatch({type: 'drawCard', player: 'player4'})
        }
    }
}



// AI 1, uses a Big Money strategy. Buys Provinces, Gold, Silver and nothing else in that order.
// Surprisingly effective.


export default function getAction1 (type, dispatch, state) {
    const gameLoop = state.gameLoop
    const player2 = state.playerTray.player2
    let hand  = player2.hand
    const gold = state.playArea.gold

    if (type === 'playActions') {
        dispatch({type: 'pass',
        actionSubphase: gameLoop.actionSubphase,
        buySubphase: gameLoop.buySubphase, 
        turnPhase: gameLoop.turnPhase})
        return
    }
    if (type === 'playTreasure') {
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].type === 'treasure') {
                console.log('AI1 played ' + hand[i].name)
                dispatch({type: 'addToPlayArea', payload: hand[i]})
                dispatch({type: 'removeFromHand', payload: hand[i], player: 'player2'})
                dispatch({type: 'setGold', operator: '+', payload: hand[i].effects})
                dispatch({type: 'updateGameState', payload: true})
                return
            }
        }
    }
    if (type === 'buyCards') {
        if (gold >= 8) {
            let card = state.baseCardTray.provinceStack[0]
            console.log('AI1 bought ' + card.name)
            dispatch({type: 'removeFromStack', stack: 'provinceStack'})
            dispatch({type: 'addToDiscard', payload: card, player: 'player2'})
            dispatch({type: 'decrementBuys'})
            dispatch({type: 'setGold', payload: card.cost, operator: '-'})
            dispatch({type: 'updateGameState', payload: true})
            return
        } else if (gold >= 6) {
            if (state.baseCardTray.goldStack[0]) {
                let card = state.baseCardTray.goldStack[0]
                console.log('AI1 bought ' + card.name)
                dispatch({type: 'removeFromStack', stack: 'goldStack'})
                dispatch({type: 'addToDiscard', payload: card, player: 'player2'})
                dispatch({type: 'decrementBuys'})
                dispatch({type: 'setGold', payload: card.cost, operator: '-'})
                dispatch({type: 'updateGameState', payload: true})
                return
            }
        } else if (gold >= 3) {
            if (state.baseCardTray.silverStack[0]) {
                let card = state.baseCardTray.silverStack[0]
                console.log('AI1 bought ' + card.name)
                dispatch({type: 'removeFromStack', stack: 'silverStack'})
                dispatch({type: 'addToDiscard', payload: card, player: 'player2'})
                dispatch({type: 'decrementBuys'})
                dispatch({type: 'setGold', payload: card.cost, operator: '-'})
                dispatch({type: 'updateGameState', payload: true})
                return
            }
        } else {
            dispatch({type: 'pass',
            actionSubphase: gameLoop.actionSubphase,
            buySubphase: gameLoop.buySubphase, 
            turnPhase: gameLoop.turnPhase})
            return
        }
    }
    if (type === 'discard') {
        let priority = [
        'Curse', 
        'Estate',
        'Province',
        'Copper',
        'Silver',
        'Gold'
        ]

        for (let i = 0; i < priority.length; i++) {
            for (let j = 0; j < hand.length; j++) {
                if (priority[i] === hand[j].name) {
                    let card = hand[j]
                    console.log('AI1 discarded ' + card.name)
                    dispatch({type: 'addToDiscard', payload: card, player: 'player2'})
                    dispatch({type: 'updateGameState', payload: true})
                    return
                }
            }
        }
    }
    if (type === 'trash') {
        console.log('should not get here')
    }
}
export function discardReducer (state, action) {
    switch (action.type) {
        case 'addToDiscard':
            return [
                action.payload,
                ...state,
            ]
        case 'addArrayToDiscard':
            let newDiscard  = action.payload.concat(state)
            return newDiscard
        case 'removeFromDiscard':
            let alreadyRemoved = false;
            return state.filter(card => {
                if (alreadyRemoved) {
                    return true;
                }
                if (card.id === action.payload.id) {
                    alreadyRemoved = true;
                    return false;
                }
                return true;
            })
        default:
            return state;
    }
}
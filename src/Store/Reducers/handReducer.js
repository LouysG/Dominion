export function handReducer(state, action) {
    switch (action.type) {
        case 'addToHand':
            if (action.payload) {
                return [
                    ...state,
                    action.payload
                ]
            }
            return state;
        case 'addArrayToHand':
            let newHand = state.concat(action.payload)
            return newHand
        case 'removeFromHand':
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
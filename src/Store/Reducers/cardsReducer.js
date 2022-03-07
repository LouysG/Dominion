export function cardsReducer (state, action) {
        switch (action.type) {
            case 'addCardToTheStack':
                if (action.payload) {
                    return [
                        ...state,
                        action.payload
                    ]
                }
                return state;
            case 'removeCardFromTheStack':
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
    
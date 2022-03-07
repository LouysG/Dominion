export default function setAsideTrayReducer (state, action) {
    switch (action.type) {
        case 'addToSetAsideTray':
            return [
                ...state,
                action.payload
            ]
        case 'removeFromSetAsideTray':
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
        case 'clearSetAsideTray':
            return []
        default:
            return state;
    }
}
export default function selectorTray (state, action) {
    switch (action.type) {
        case 'addToSelectorTray':
            return [
                ...state,
                action.payload
            ]
        case 'addArrayToSelectorTray':
            let newSelectorTray = action.payload.concat(state)
            return newSelectorTray
        case 'clearSelectorTray':
            return [] 
        case 'removeFromSelectorTray':
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
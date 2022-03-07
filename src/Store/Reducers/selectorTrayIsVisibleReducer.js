export function selectorTrayIsVisibleReducer (state, action) {
    if (action.type === 'setSelectorTrayVisibility') {
        return action.payload;
    }
    return state;
}
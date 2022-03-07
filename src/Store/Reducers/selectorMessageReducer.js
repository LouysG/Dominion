export function selectorMessageReducer (state, action) {
    if (action.type === 'setSelectorMessage') {
        return action.payload;
    }
    return state;
}
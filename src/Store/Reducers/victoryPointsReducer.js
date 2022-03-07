export function victoryPointsReducer (state, action) {
    if (action.type === 'setPoints') {
        return action.payload;
    }
    return state;
}
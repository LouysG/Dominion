export default function victoryScreenReducer (state, action) {
    if (action.type === 'displayVictoryScreen') {
        return action.payload;
    }
    return state;
}
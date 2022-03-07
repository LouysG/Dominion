export default function gamePhaseReducer (state, action) {
    if (action.type === 'setGamePhase') {
        return action.payload;
    }
    return state;
}
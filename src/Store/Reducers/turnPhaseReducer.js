export default function turnPhaseReducer (state, action) {
    if (action.type === 'setTurnPhase') {
        return action.payload;
    }
    return state;
}
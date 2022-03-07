export default function updateGameStateReducer (state, action) {
    if (action.type === 'updateGameState') {
        return action.payload;
    }
    return state;
}
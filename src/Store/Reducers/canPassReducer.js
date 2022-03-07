export function canPassReducer (state, action) {
    if (action.type === 'setCanPass') {
        return action.payload;
    }
    return state;
}
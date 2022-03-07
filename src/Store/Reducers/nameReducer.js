export function nameReducer (state, action) {
    if (action.type === 'setName') {
        return action.payload;
    }
    return state;
}
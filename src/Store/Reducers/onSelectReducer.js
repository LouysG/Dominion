export function onSelectReducer (state, action) {
    if (action.type === 'setOnSelect') {
        return action.payload
    }
    return state;
}
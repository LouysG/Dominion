export function callGetActionReducer (state, action) {
    if (action.type === 'callGetAction') {
        return action.payload
    }
    return state;
}
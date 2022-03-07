export function stackReducer (state, action) {
    if (action.type === 'removeFromStack') {
        let newStack = state.slice(1)
        return newStack;
    }
    return state;
}
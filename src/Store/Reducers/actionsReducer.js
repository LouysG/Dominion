export default function actionsReducer (state, action) {
    if (action.type === 'decrementActions') {
        return state - 1;
    }
    if (action.type === 'incrementActions') {
        return state + 1;
    }
    return state;
}
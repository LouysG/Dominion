export default function buysReducer (state, action) {
    if (action.type === 'decrementBuys') {
        return state - 1;
    }
    if (action.type === 'incrementBuys') {
        return state + 1;
    }
    return state;
}
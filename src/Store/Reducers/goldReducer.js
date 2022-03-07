export default function goldReducer (state, action) {
    if (action.type === 'decrementGold') {
        return state - 1;
    }
    if (action.type === 'incrementGold') {
        return state + 1;
    }
    if (action.type === 'setGold') {
        if (action.operator === '+') {
            return state + action.payload
        }
        if (action.operator === '-') {
            return state - action.payload
        }
    }
    return state;
}
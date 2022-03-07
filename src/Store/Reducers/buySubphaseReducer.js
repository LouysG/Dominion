export default function buySubphaseReducer (state, action) {
    if (action.type === 'setBuySubphase') {
        return action.payload;
    }
    return state;
}
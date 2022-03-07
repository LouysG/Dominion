export function handSegmentReducer (state, action) {
    if (action.type === 'decrementHandSegment') {
        return state - 1;
    }
    if (action.type === 'incrementHandSegment') {
        return state + 1;
    }
    return state;
}
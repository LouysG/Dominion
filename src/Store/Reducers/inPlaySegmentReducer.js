export function inPlaySegmentReducer (state, action) {
    if (action.type === 'decrementInPlaySegment') {
        return state - 1;
    }
    if (action.type === 'incrementInPlaySegment') {
        return state + 1;
    }
    return state;
}
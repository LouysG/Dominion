export function selectorTraySegmentReducer (state, action) {
    if (action.type === 'decrementSelectorTraySegment') {
        return state - 1;
    }
    if (action.type === 'incrementSelectorTraySegment') {
        return state + 1;
    }
    return state;
}
export function selectionCriteriaReducer (state, action) {
    if (action.type === 'setSelectionCriteria') {
        return action.payload;
    }
    return state;
}
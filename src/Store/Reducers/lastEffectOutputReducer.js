export default function lastEffectOutputReducer (state, action) {
    if (action.type === 'setLastEffectOutput') {
        if (action.specialAction === 'increment') {
            if (typeof state !== 'number') {
                return 1
            }
            return state + 1
        }
        if (action.specialAction === 'decrement') {
            return {
                ...state,
                payload: state.payload - 1
            }
        }
        return action.payload;
    }
    return state;
}
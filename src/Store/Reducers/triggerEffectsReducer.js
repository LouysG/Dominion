export default function triggerEffectsReducer (state, action) {
    if (action.type === 'incrementMerchantEffect') {
        if (!state.merchant) {
            return {
                ...state,
                merchant: 1
            }
        }
        return {
            ...state,
            merchant: state.merchant + 1
        }
    }
    if (action.type === 'clearTriggerEffects') {
        return {}
    }
    return {
        ...state
    }
}
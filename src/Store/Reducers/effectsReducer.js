export function effectsReducer (state, action) {
    switch (action.type) {
        case 'addEffectToTheStack':
            if (action.payload) {
                return [
                    ...state,
                    action.payload
                ]
            }
            return state;        
        case 'removeEffectFromTheStack':
            let effects = state.slice()
            effects.shift()
            return effects
        default:
            return state;
    }
}
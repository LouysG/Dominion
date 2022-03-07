import { cardsReducer } from './cardsReducer.js'
import { effectsReducer } from './effectsReducer.js'
import lastEffectOutputReducer from './lastEffectOutputReducer.js'


export function theStackReducer (state, action) {
    return {
        ...state,
        cards: cardsReducer(state.cards, action),
        effects: effectsReducer(state.effects, action),
        lastEffectOutput: lastEffectOutputReducer(state.lastEffectOutput, action)
    }
}

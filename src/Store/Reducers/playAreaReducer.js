import inPlayReducer from './inPlayReducer.js';
import actionsReducer from './actionsReducer.js';
import buysReducer from './buysReducer.js';
import goldReducer from './goldReducer.js';
import selectorTrayReducer from './selectorTrayReducer.js';
import setAsideTrayReducer from './setAsideTrayReducer.js';
import { inPlaySegmentReducer } from './inPlaySegmentReducer.js';
import { selectorTraySegmentReducer} from './selectorTraySegmentReducer.js';
import { selectorTrayIsVisibleReducer } from './selectorTrayIsVisibleReducer.js';
import { selectorMessageReducer } from './selectorMessageReducer.js';
import optionalButtonsReducer from './optionalButtonsReducer.js'


export function playAreaReducer (state, action) {

    if (action.type === 'resetResources') {
        return {
            ...state,
            actions: 1,
            buys: 1,
            gold: 0
        }
    }

    return {
        ...state,
        inPlay: inPlayReducer(state.inPlay, action),
        inPlaySegment: inPlaySegmentReducer(state.inPlaySegment, action),
        actions: actionsReducer(state.actions, action),
        buys: buysReducer(state.buys, action),
        gold: goldReducer(state.gold, action),
        selectorTray: selectorTrayReducer(state.selectorTray, action),
        selectorMessage: selectorMessageReducer(state.selectorMessage, action),
        selectorTraySegment: selectorTraySegmentReducer(state.selectorTraySegment, action),
        selectorTrayIsVisible: selectorTrayIsVisibleReducer(state.selectorTrayIsVisible, action),
        setAsideTray: setAsideTrayReducer(state.setAsideTray, action),
        optionalButtons: optionalButtonsReducer(state.optionalButtons, action)
    }
}
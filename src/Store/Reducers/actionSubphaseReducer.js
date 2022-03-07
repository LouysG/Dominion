export default function actionSubphaseReducer (state, action) {
    if (action.type === 'setActionSubphase') {
        return action.payload;
    }
    return state;
}
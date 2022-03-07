export default function buttonReducer (state, action) {
    if (action.type === 'setButton') {
        return action.payload
    }

}